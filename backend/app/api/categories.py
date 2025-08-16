# routes/categories_router.py
from fastapi import APIRouter, HTTPException
from app.database import get_database
from app.models.categories import Category, CategoryResponse

router = APIRouter()

def get_categories_collection():
    return get_database()["categories"]

def convert_category_response(category: dict) -> CategoryResponse:
    return CategoryResponse(**category)

@router.get("/categories", response_model=list[CategoryResponse])
async def get_categories():
    collection = get_categories_collection()
    try:
        cursor = collection.find()  # Don't exclude _id
        categories = await cursor.to_list(length=100)
        return [
            CategoryResponse(
                id=str(cat["_id"]),
                name=cat["name"],
                description=cat["description"],
                image=cat["image"],
                icon=cat["icon"]
            )
            for cat in categories
        ]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")


@router.post("/categories", response_model=CategoryResponse)
async def create_category(category: Category):
    collection = get_categories_collection()
    category_dict = category.dict(by_alias=True, exclude={"id"})
    result = await collection.insert_one(category_dict)
    created = await collection.find_one({"_id": result.inserted_id})
    return CategoryResponse(
        id=str(created["_id"]),
        name=created["name"],
        description=created["description"],
        image=created["image"],
        icon=created["icon"]
    )
