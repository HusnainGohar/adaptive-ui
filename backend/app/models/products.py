# models/product.py
from typing import List, Optional
from pydantic import BaseModel, Field
from bson import ObjectId

class PyObjectId(ObjectId):
    """Custom ObjectId class for Pydantic v2"""
    @classmethod
    def __get_pydantic_core_schema__(cls, source_type, handler):
        from pydantic_core import core_schema
        return core_schema.with_info_before_validator_function(
            cls.validate,
            core_schema.str_schema(),
        )

    @classmethod
    def validate(cls, v, info=None):
        if isinstance(v, ObjectId):
            return str(v)
        if isinstance(v, str) and ObjectId.is_valid(v):
            return v
        raise ValueError("Invalid ObjectId")

class Product(BaseModel):
    model_config = {
        "populate_by_name": True,
        "arbitrary_types_allowed": True,
        "json_encoders": {ObjectId: str}
    }

    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
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

class ProductResponse(BaseModel):
    id: str
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

class PaginatedProductResponse(BaseModel):
    total_count: int
    has_next: bool
    products: List[ProductResponse]
