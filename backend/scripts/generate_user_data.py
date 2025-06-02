import random
import pandas as pd
import os

PERSONAS = {
    "review_reader": ["reviews_read", "products_viewed", "purchases", "searches"],
    "deal_hunter": ["deals_clicked", "products_viewed", "purchases", "searches"],
    "window_shopper": ["products_viewed", "wishlists", "purchases", "searches"],
    "impulse_shopper": ["quick_purchases", "products_viewed", "cart_adds", "searches"],
    "loyal_customer": ["repeat_purchases", "brand_visits", "products_viewed", "searches"],
    "practical_shopper": ["specs_viewed", "products_viewed", "purchases", "searches"],
    "ethical_shopper": ["eco_products_viewed", "brand_research", "purchases", "searches"],
    "gift_giver": ["gift_guides_viewed", "products_viewed", "purchases", "searches"]
}

PATTERNS = {
    "reviews_read": (15, 30),
    "products_viewed": (10, 50),
    "purchases": (0, 5),
    "searches": (2, 20),
    "deals_clicked": (10, 30),
    "wishlists": (5, 15),
    "quick_purchases": (5, 10),
    "cart_adds": (10, 20),
    "repeat_purchases": (5, 15),
    "brand_visits": (10, 20),
    "specs_viewed": (10, 20),
    "eco_products_viewed": (10, 20),
    "brand_research": (5, 10),
    "gift_guides_viewed": (5, 10)
}

all_features = sorted({f for feats in PERSONAS.values() for f in feats})

os.makedirs("data", exist_ok=True)
rows = []
user_id = 1
users_per_persona = 1000  # Adjust as needed

for persona, features in PERSONAS.items():
    for _ in range(users_per_persona):
        row = {"user_id": user_id, "persona": persona}
        # Main persona features: realistic values
        for feat in all_features:
            if feat in features:
                low, high = PATTERNS[feat]
                row[feat] = random.randint(low, high)
            else:
                # Off-persona features: 10% chance of a small random value (to mimic real users)
                if random.random() < 0.1:
                    row[feat] = random.randint(0, 2)
                else:
                    row[feat] = 0
        rows.append(row)
        user_id += 1

df = pd.DataFrame(rows, columns=["user_id", "persona"] + all_features)
df.to_csv("data/user_behavior.csv", index=False)
print(f"✅ user_behavior.csv generated with {len(rows)} users and realistic, ML-ready data.")
