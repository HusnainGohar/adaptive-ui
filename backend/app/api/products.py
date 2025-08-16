# products_router.py
from fastapi import APIRouter, HTTPException
from typing import Optional
from app.database import get_database
from app.models.products import Product, ProductResponse, PaginatedProductResponse

router = APIRouter()

def convert_product_response(product: dict) -> ProductResponse:
    return ProductResponse(**product)

def get_products_collection():
    return get_database()["products"]

@router.get("/products", response_model=PaginatedProductResponse)
async def get_all_products(
    skip: int = 0,
    limit: int = 100,
    category: Optional[str] = None,
    brand: Optional[str] = None,
    in_stock: Optional[bool] = None
):
    collection = get_products_collection()

    query_filter = {}
    if category:
        query_filter["category"] = {"$regex": category, "$options": "i"}
    if brand:
        query_filter["brand"] = {"$regex": brand, "$options": "i"}
    if in_stock is not None:
        query_filter["inStock"] = in_stock

    try:
        total_count = await collection.count_documents(query_filter)
        cursor = collection.find(query_filter, {"_id": 0}).skip(skip).limit(limit)
        products = await cursor.to_list(length=limit)

        return PaginatedProductResponse(
            total_count=total_count,
            has_next=(skip + limit) < total_count,
            products=[ProductResponse(**product) for product in products]
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

@router.get("/products/{product_id}", response_model=ProductResponse)
async def get_product_by_id(product_id: int):
    """Get a single product by its ID"""
    collection = get_products_collection()
    
    try:
        product = await collection.find_one({"product_id": product_id})
        if product is None:
            raise HTTPException(status_code=404, detail="Product not found")
        return convert_product_response(product)
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

@router.post("/products", response_model=ProductResponse)
async def create_product(product: Product):
    """Create a new product"""
    collection = get_products_collection()
    
    try:
        # Check if product with same product_id already exists
        existing = await collection.find_one({"product_id": product.product_id})
        if existing:
            raise HTTPException(status_code=400, detail="Product with this ID already exists")
        
        # Convert to dict and remove the auto-generated _id for insertion
        product_dict = product.dict(by_alias=True, exclude={"id"})
        
        result = await collection.insert_one(product_dict)
        if result.inserted_id:
            created_product = await collection.find_one({"_id": result.inserted_id})
            return convert_product_response(created_product)
        else:
            raise HTTPException(status_code=500, detail="Failed to create product")
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

@router.put("/products/{product_id}", response_model=ProductResponse)
async def update_product(product_id: int, product_update: Product):
    """Update an existing product"""
    collection = get_products_collection()
    
    try:
        product_update.product_id = product_id
        update_dict = product_update.dict(by_alias=True, exclude={"id"})
        
        result = await collection.replace_one(
            {"product_id": product_id},
            update_dict
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Product not found")
        
        updated_product = await collection.find_one({"product_id": product_id})
        return convert_product_response(updated_product)
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

@router.delete("/products/{product_id}")
async def delete_product(product_id: int):
    """Delete a product"""
    collection = get_products_collection()
    
    try:
        result = await collection.delete_one({"product_id": product_id})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Product not found")
        
        return {"message": "Product deleted successfully"}
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

@router.get("/products/health/db")
async def check_database_health():
    """Check database connectivity"""
    try:
        db = get_database()
        await db.command("ping")
        return {"status": "healthy", "database": "connected"}
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"Database unavailable: {str(e)}")