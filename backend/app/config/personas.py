# config/personas.py

PERSONAS = {
    "REVIEW_READER": "review_reader",
    "DEAL_HUNTER": "deal_hunter",
    "WINDOW_SHOPPER": "window_shopper",
    "IMPULSE_SHOPPER": "impulse_shopper",
    "LOYAL_CUSTOMER": "loyal_customer",
    "PRACTICAL_SHOPPER": "practical_shopper",
    "ETHICAL_SHOPPER": "ethical_shopper",
    "GIFT_GIVER": "gift_giver"
}

PROFILE_PATTERNS = {
    PERSONAS["REVIEW_READER"]: {
        "reviews_read": (15, 30),
        "products_viewed": (10, 20),
        "purchases": (2, 5),
        "searches": (10, 20)
    },
    PERSONAS["DEAL_HUNTER"]: {
        "deals_clicked": (10, 30),
        "products_viewed": (15, 25),
        "purchases": (5, 10),
        "searches": (5, 15)
    },
    PERSONAS["WINDOW_SHOPPER"]: {
        "products_viewed": (25, 50),
        "wishlists": (5, 15),
        "purchases": (0, 2),
        "searches": (10, 20)
    },
    PERSONAS["IMPULSE_SHOPPER"]: {
        "quick_purchases": (5, 10),
        "products_viewed": (10, 20),
        "cart_adds": (10, 20),
        "searches": (2, 5)
    },
    PERSONAS["LOYAL_CUSTOMER"]: {
        "repeat_purchases": (5, 15),
        "brand_visits": (10, 20),
        "products_viewed": (10, 20),
        "searches": (2, 5)
    },
    PERSONAS["PRACTICAL_SHOPPER"]: {
        "specs_viewed": (10, 20),
        "products_viewed": (10, 20),
        "purchases": (2, 5),
        "searches": (5, 10)
    },
    PERSONAS["ETHICAL_SHOPPER"]: {
        "eco_products_viewed": (10, 20),
        "brand_research": (5, 10),
        "purchases": (2, 5),
        "searches": (5, 10)
    },
    PERSONAS["GIFT_GIVER"]: {
        "gift_guides_viewed": (5, 10),
        "products_viewed": (10, 20),
        "purchases": (2, 5),
        "searches": (5, 10)
    }
}
