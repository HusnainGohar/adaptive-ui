from fastapi import APIRouter, HTTPException
from typing import List, Optional
from pydantic import BaseModel
import json
import os

router = APIRouter()

# Define path to JSON file (adjust if needed)
PRODUCTS_FILE = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "data", "products.json")

class Product(BaseModel):
    id: int
    name: str
    price: float
    originalPrice: float
    rating: float
    reviewCount: int
    image: str
    category: str
    brand: str
    inStock: bool
    isNew: bool
    onSale: bool
    sustainability: dict
    features: List[str]
    description: str
    specifications: dict

_cached_products: Optional[List[dict]] = None

def load_products() -> List[dict]:
    global _cached_products
    if _cached_products is None:
        try:
            with open(PRODUCTS_FILE, "r", encoding="utf-8") as f:
                _cached_products = json.load(f)['products']
        except FileNotFoundError:
            _cached_products = []
    return _cached_products

@router.get("/products", response_model=List[Product])
def get_all_products():
    return load_products()

@router.get("/products/{product_id}", response_model=Product)
def get_product_by_id(product_id: int):
    products = load_products()
    product = next((p for p in products if p["id"] == product_id), None)
    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return product
