import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
from sklearn.cluster import KMeans
from sklearn.pipeline import Pipeline
import joblib
import os

# Load your user data
df = pd.read_csv("data/user_behavior.csv")

# Use the correct feature list
feature_cols = [
    'brand_research', 'brand_visits', 'cart_adds', 'deals_clicked',
    'eco_products_viewed', 'gift_guides_viewed', 'products_viewed',
    'purchases', 'quick_purchases', 'repeat_purchases', 'reviews_read',
    'searches', 'specs_viewed', 'wishlists'
]

X = df[feature_cols].values

pipeline = Pipeline([
    ("scaler", StandardScaler()),
    ("pca", PCA(n_components=0.95)),
    ("kmeans", KMeans(n_clusters=8, random_state=42))
])

pipeline.fit(X)

os.makedirs("app/model", exist_ok=True)
joblib.dump(pipeline, "app/model/persona_clustering_pipeline.joblib")

with open("app/model/feature_cols.txt", "w") as f:
    f.write("\n".join(feature_cols))

print("✅ Model and feature_cols.txt saved.")
