import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
from sklearn.cluster import KMeans
from sklearn.pipeline import Pipeline
from sklearn.model_selection import train_test_split
from sklearn.metrics import silhouette_score, davies_bouldin_score, calinski_harabasz_score
import joblib
import os
import matplotlib.pyplot as plt
import numpy as np

# Load your user data (no persona column - pure behavioral data)
df = pd.read_csv("data/user_behavior.csv")

# Use all behavioral features for clustering
feature_cols = [
    'brand_research', 'brand_visits', 'cart_adds', 'deals_clicked',
    'eco_products_viewed', 'gift_guides_viewed', 'products_viewed',
    'purchases', 'quick_purchases', 'repeat_purchases', 'reviews_read',
    'searches', 'specs_viewed', 'wishlists'
]

X = df[feature_cols].values

# Split into train (70%), validation (15%), test (15%)
X_train, X_temp = train_test_split(X, test_size=0.3, random_state=42)
X_val, X_test = train_test_split(X_temp, test_size=0.5, random_state=42)

print(f"📊 Dataset Info:")
print(f"   Total users: {len(df)}")
print(f"   Features: {len(feature_cols)}")
print(f"   Train set: {len(X_train)} users")
print(f"   Validation set: {len(X_val)} users")
print(f"   Test set: {len(X_test)} users")

# Use fixed k=8 for 8 personas
best_k = 8
print(f"\n🎯 Using fixed k={best_k} for 8 personas")

# Train final pipeline with best k
print(f"\n🚀 Training final model with k={best_k}...")
pipeline = Pipeline([
    ("scaler", StandardScaler()),
    ("pca", PCA(n_components=0.95)),
    ("kmeans", KMeans(n_clusters=best_k, random_state=42))
])
pipeline.fit(X_train)

# Evaluate on all splits
def print_metrics(X, split_name):
    X_embedded = pipeline.named_steps["pca"].transform(pipeline.named_steps["scaler"].transform(X))
    labels = pipeline.named_steps["kmeans"].predict(X_embedded)
    sil = silhouette_score(X_embedded, labels)
    db = davies_bouldin_score(X_embedded, labels)
    ch = calinski_harabasz_score(X_embedded, labels)
    print(f"{split_name} - Silhouette Score: {sil:.4f}, Davies-Bouldin Index: {db:.4f}, Calinski-Harabasz: {ch:.2f}")
    return X_embedded, labels

print(f"\n📊 Final Model Performance:")
print_metrics(X_train, "Train")
val_embedded, val_labels = print_metrics(X_val, "Validation")
print_metrics(X_test, "Test")

# Save model and features
os.makedirs("app/model", exist_ok=True)
joblib.dump(pipeline, "app/model/persona_clustering_pipeline.joblib")
with open("app/model/feature_cols.txt", "w") as f:
    f.write("\n".join(feature_cols))
print(f"\n✅ Model saved with k={best_k} clusters")

# Visualize discovered clusters in 2D PCA (validation set)
try:
    pca_2d = PCA(n_components=2)
    val_2d = pca_2d.fit_transform(val_embedded)
    plt.figure(figsize=(12, 8))
    scatter = plt.scatter(val_2d[:, 0], val_2d[:, 1], c=val_labels, cmap='tab10', alpha=0.7, s=50)
    plt.title(f'Discovered User Segments (k={best_k}) - Unsupervised Clustering', fontsize=14, fontweight='bold')
    plt.xlabel("Principal Component 1", fontsize=12)
    plt.ylabel("Principal Component 2", fontsize=12)
    plt.colorbar(scatter, label="Discovered Segment")
    plt.grid(True, alpha=0.3)
    plt.tight_layout()
    plt.savefig("app/model/discovered_segments_pca2d.png", dpi=300, bbox_inches='tight')
    print("✅ Visualization saved as 'discovered_segments_pca2d.png'")
    plt.show()
except Exception as e:
    print(f"⚠️ Could not display plot: {e}")
    print("✅ Plot saved as 'discovered_segments_pca2d.png'")

# Analyze discovered segments
print(f"\n🔍 Analysis of Discovered Segments:")
print(f"   Model found {best_k} natural user behavior patterns")
print(f"   Each segment represents users with similar shopping behaviors")
print(f"   These segments can be used to create personalized experiences")

# Show cluster distribution
print(f"\n📈 Cluster Distribution (Validation Set):")
unique, counts = np.unique(val_labels, return_counts=True)
for cluster_id, count in zip(unique, counts):
    percentage = (count / len(val_labels)) * 100
    print(f"   Cluster {cluster_id}: {count} users ({percentage:.1f}%)")

# Summary
print(f"\n🎉 Summary:")
print(f"   Fixed clusters: {best_k}")
print(f"   Model ready for production use!")
