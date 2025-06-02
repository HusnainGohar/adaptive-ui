from fastapi import APIRouter
import pandas as pd
import joblib
from app.config.cluster_mapping import CLUSTER_LABELS

router = APIRouter()
pipeline = joblib.load("app/model/persona_clustering_pipeline.joblib")

with open("app/model/feature_cols.txt") as f:
    feature_cols = [line.strip() for line in f]

@router.post("/predict_persona/")
def predict_persona(features: dict):
    try:
        print("Received features:", features)
        input_data = {col: features.get(col, 0) for col in feature_cols}
        print("Input data for model:", input_data)
        X = pd.DataFrame([input_data])
        print("DataFrame shape:", X.shape)
        cluster = pipeline.predict(X)[0]
        persona = CLUSTER_LABELS[cluster]
        return {"persona": persona}
    except Exception as e:
        print("ERROR:", e)
        return {"error": str(e)}

