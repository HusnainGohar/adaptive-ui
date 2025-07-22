import joblib
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import json

# Step 1: Load the trained clustering pipeline
pipeline_path = 'app/model/persona_clustering_pipeline.joblib'

try:
    pipeline = joblib.load(pipeline_path)
    print(f"Pipeline loaded successfully from {pipeline_path}")
except Exception as e:
    print(f"Failed to load pipeline: {e}")
    exit(1)

# Step 2: Extract KMeans and PCA steps
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
    print("Could not find both KMeans and PCA steps in the pipeline.")
    exit(1)

# Step 3: Invert PCA transformation to get means in original feature space
centers_pca = kmeans.cluster_centers_
centers_original = pca.inverse_transform(centers_pca)

# Step 4: Load feature names
with open('app/model/feature_cols.txt') as f:
    feature_names = [line.strip() for line in f]

# Step 5: Map means to feature names and export as JSON
cluster_means = {}
for idx, center in enumerate(centers_original):
    cluster_means[str(idx)] = {feature: float(f"{val:.4f}") for feature, val in zip(feature_names, center)}

with open('scripts/cluster_means.json', 'w') as f:
    json.dump(cluster_means, f, indent=2)

print("Cluster means exported to backend/scripts/cluster_means.json. You can now copy this JSON into ChatGPT for LLM-based labeling.")
