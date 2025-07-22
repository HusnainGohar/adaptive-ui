import requests
import joblib
import json
import os
import ast

# 1. Load trained pipeline
pipeline_path = 'app/model/persona_clustering_pipeline.joblib'
pipeline = joblib.load(pipeline_path)

# 2. Extract KMeans and PCA steps
kmeans = None
pca = None
if hasattr(pipeline, 'named_steps'):
    for name, step in pipeline.named_steps.items():
        if hasattr(step, 'cluster_centers_'):
            kmeans = step
        if hasattr(step, 'inverse_transform') and hasattr(step, 'components_'):
            pca = step
elif hasattr(pipeline, 'cluster_centers_'):
    kmeans = pipeline

if kmeans is None or pca is None:
    raise Exception("Could not find both KMeans and PCA steps in the pipeline.")

# 3. Invert PCA transformation to get means in original feature space
centers_pca = kmeans.cluster_centers_
centers_original = pca.inverse_transform(centers_pca)

# 4. Load feature names
with open('app/model/feature_cols.txt') as f:
    feature_names = [line.strip() for line in f]

# 5. Prepare cluster means as dict
cluster_means = {}
for idx, center in enumerate(centers_original):
    cluster_means[str(idx)] = {feature: float(f"{val:.4f}") for feature, val in zip(feature_names, center)}

# 6. Prepare prompt for LLM with very strict formatting instructions
prompt = (
    "You are an expert data analyst. Analyze these cluster means and assign labels.\n"
    "CRITICAL: Return ONLY a Python dictionary exactly like this example (no other text):\n"
    "{0: 'review_reader', 1: 'deal_hunter', 2: 'window_shopper', 3: 'impulse_shopper', "
    "4: 'loyal_customer', 5: 'practical_shopper', 6: 'ethical_shopper', 7: 'gift_giver'}\n\n"
    "Rules:\n"
    "1. Use ONLY these exact labels (no changes allowed):\n"
    "   review_reader, deal_hunter, window_shopper, impulse_shopper, loyal_customer, practical_shopper, ethical_shopper, gift_giver\n"
    "2. Use numbers 0-7 as keys\n"
    "3. Use single quotes for strings\n"
    "4. Include all 8 clusters\n"
    "5. Return ONLY the dictionary, nothing else\n\n"
    "Cluster means:\n"
    f"{json.dumps(cluster_means, indent=2)}\n\n"
    "Return the dictionary now:"
)

# 7. Call local Ollama API
ollama_api_url = "http://localhost:11434/api/chat"
payload = {
    "model": "llama3",
    "messages": [
        {"role": "system", "content": "You are a helpful assistant that returns only valid Python dictionaries."},
        {"role": "user", "content": prompt}
    ],
    "stream": False
}

print("Sending request to local Ollama (llama3)... This might take a moment.")
try:
    response = requests.post(ollama_api_url, json=payload)
    response.raise_for_status()
    
    # Extract content from Ollama's response
    response_data = response.json()
    llm_reply = response_data['message']['content'].strip()
    
    print("\nRaw LLM response:", llm_reply)  # Debug print
    
    # Try multiple parsing approaches
    try:
        # Try direct ast evaluation first
        cluster_labels = ast.literal_eval(llm_reply)
    except:
        try:
            # Try cleaning up the string and parsing as JSON
            cleaned_reply = llm_reply.replace("'", '"').replace("\n", "")
            cluster_labels = json.loads(cleaned_reply)
        except:
            # If both fail, try to extract just the dictionary part
            import re
            dict_match = re.search(r'\{.*\}', llm_reply, re.DOTALL)
            if dict_match:
                dict_str = dict_match.group(0)
                try:
                    cluster_labels = ast.literal_eval(dict_str)
                except:
                    raise ValueError("Could not parse LLM response into a valid dictionary")
            else:
                raise ValueError("No dictionary found in LLM response")

    # Validate the labels
    valid_labels = {"review_reader", "deal_hunter", "window_shopper", "impulse_shopper", 
                   "loyal_customer", "practical_shopper", "ethical_shopper", "gift_giver"}
    
    # Convert string keys to int and validate
    cluster_labels = {int(k): v for k, v in cluster_labels.items()}
    
    if len(cluster_labels) != 8 or not all(v in valid_labels for v in cluster_labels.values()):
        raise ValueError("Invalid or missing labels in LLM response")

    print("\nParsed cluster labels:")
    for k in sorted(cluster_labels.keys()):
        print(f"Cluster {k}: {cluster_labels[k]}")

    # Update cluster_mapping.py
    mapping_file_path = os.path.join('app', 'config', 'cluster_mapping.py')
    with open(mapping_file_path, 'w') as f:
        f.write("CLUSTER_LABELS = {\n")
        for k in range(8):
            f.write(f"    {k}: \"{cluster_labels[k]}\",\n")
        f.write("}\n")
    
    print(f"\nCluster mapping updated in {mapping_file_path}")

except requests.exceptions.ConnectionError:
    print("\nError: Could not connect to Ollama.")
    print("Please make sure Ollama is running on your computer.")
except Exception as e:
    print(f"\nAn error occurred: {e}")
    print("Raw response was:", llm_reply if 'llm_reply' in locals() else "No response received")

