import json
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# MongoDB configuration
MONGODB_URL = os.getenv("MONGODB_URL", "mongodb+srv://myAppUser:Shehla63@genertiveui.kcrrcfi.mongodb.net/?retryWrites=true&w=majority&appName=genertiveUI")
DATABASE_NAME = os.getenv("DATABASE_NAME", "Ecommerce")
PRODUCTS_COLLECTION = os.getenv("PRODUCTS_COLLECTION", "products")
CATEGORIES_COLLECTION = os.getenv("CATEGORIES_COLLECTION", "categories")

def load_json_data(file_path):
    """Load JSON data from file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"❌ File {file_path} not found")
        return None
    except json.JSONDecodeError as e:
        print(f"❌ JSON decode error in {file_path}: {e}")
        return None

# Try to load data from files first, fallback to hardcoded data
def get_products_data():
    """Get products data from file or hardcoded"""
    # Try to load from products.json file
    file_data = load_json_data('data/products.json')
    if file_data and isinstance(file_data, dict) and 'products' in file_data:
        return file_data
    
    # Fallback to hardcoded data
    return {
        "products": []
    }

def get_categories_data():
    """Get categories data from file or hardcoded"""
    # Try to load from categories.json file
    file_data = load_json_data('data/categories.json')
    if file_data and isinstance(file_data, dict) and 'categories' in file_data:
        return file_data
    
    # Fallback to hardcoded data
    return {
        "categories": []
    }

async def import_categories_to_mongodb():
    """Import all categories from JSON data to MongoDB"""
    try:
        # Connect to MongoDB
        client = AsyncIOMotorClient(MONGODB_URL)
        database = client[DATABASE_NAME]
        collection = database[CATEGORIES_COLLECTION]
        
        print(f"📁 Importing categories to collection: {CATEGORIES_COLLECTION}")
        
        # Get categories data
        categories_data = get_categories_data()
        
        if not categories_data or 'categories' not in categories_data:
            print("❌ No categories data found")
            return
        
        # Prepare categories for insertion
        categories_to_insert = []
        for category_data in categories_data["categories"]:
            # Add timestamps
            category_data["created_at"] = datetime.utcnow()
            category_data["updated_at"] = datetime.utcnow()
            categories_to_insert.append(category_data)
        
        # Check for existing categories
        existing_categories = await collection.find(
            {"id": {"$in": [c["id"] for c in categories_to_insert]}},
            {"id": 1}
        ).to_list(length=None)
        
        existing_ids = {c["id"] for c in existing_categories}
        print(f"📋 Found {len(existing_ids)} existing categories")
        
        # Filter out existing categories
        new_categories = [c for c in categories_to_insert if c["id"] not in existing_ids]
        
        if not new_categories:
            print("ℹ️  All categories already exist in the database")
            return
        
        print(f"📥 Inserting {len(new_categories)} new categories...")
        
        # Insert new categories
        result = await collection.insert_many(new_categories)
        
        print(f"✅ Successfully inserted {len(result.inserted_ids)} categories!")
        
        # Get total count
        total_count = await collection.count_documents({})
        print(f"📊 Total categories in collection: {total_count}")
        
        client.close()
        
    except Exception as e:
        print(f"❌ Error importing categories: {e}")
        raise

async def import_products_to_mongodb():
    """Import all products from JSON data to MongoDB"""
    try:
        # Connect to MongoDB
        client = AsyncIOMotorClient(MONGODB_URL)
        database = client[DATABASE_NAME]
        collection = database[PRODUCTS_COLLECTION]
        
        print(f"📁 Importing products to collection: {PRODUCTS_COLLECTION}")
        
        # Get products data
        products_data = get_products_data()
        
        if not products_data or 'products' not in products_data:
            print("❌ No products data found")
            return
        
        print(f"📦 Found {len(products_data['products'])} products to process")
        
        # Prepare products for insertion
        products_to_insert = []
        for product_data in products_data["products"]:
            # Add timestamps
            product_data["created_at"] = datetime.utcnow()
            product_data["updated_at"] = datetime.utcnow()
            products_to_insert.append(product_data)
        
        # Check for existing products
        existing_products = await collection.find(
            {"id": {"$in": [p["id"] for p in products_to_insert]}},
            {"id": 1}
        ).to_list(length=None)
        
        existing_ids = {p["id"] for p in existing_products}
        print(f"📋 Found {len(existing_ids)} existing products")
        
        # Filter out existing products
        new_products = [p for p in products_to_insert if p["id"] not in existing_ids]
        
        if not new_products:
            print("ℹ️  All products already exist in the database")
            return
        
        print(f"📥 Inserting {len(new_products)} new products...")
        
        # Insert new products
        result = await collection.insert_many(new_products)
        
        print(f"✅ Successfully inserted {len(result.inserted_ids)} products!")
        
        # Get total count
        total_count = await collection.count_documents({})
        print(f"📊 Total products in collection: {total_count}")
        
        client.close()
        
    except Exception as e:
        print(f"❌ Error importing products: {e}")
        raise

async def clear_collection(collection_name):
    """Clear all documents from a collection"""
    try:
        client = AsyncIOMotorClient(MONGODB_URL)
        database = client[DATABASE_NAME]
        collection = database[collection_name]
        
        # Clear collection
        result = await collection.delete_many({})
        print(f"🗑️  Deleted {result.deleted_count} documents from {collection_name}")
        
        client.close()
        
    except Exception as e:
        print(f"❌ Error clearing collection {collection_name}: {e}")

async def main():
    """Main function to run the importer"""
    print("🚀 Starting Data Importer")
    print("=" * 50)
    
    # Test MongoDB connection first
    try:
        client = AsyncIOMotorClient(MONGODB_URL)
        await client.admin.command('ping')
        print(f"✅ Connected to MongoDB at {MONGODB_URL}")
        print(f"📊 Database: {DATABASE_NAME}")
        print(f"📦 Collections: {PRODUCTS_COLLECTION}, {CATEGORIES_COLLECTION}")
        client.close()
    except Exception as e:
        print(f"❌ Failed to connect to MongoDB: {e}")
        return
    
    import sys
    
    if len(sys.argv) > 1:
        if sys.argv[1] == "--clear-all":
            print("⚠️  Clearing all data from collections...")
            await clear_collection(PRODUCTS_COLLECTION)
            await clear_collection(CATEGORIES_COLLECTION)
            print("✅ All collections cleared!")
            return
        elif sys.argv[1] == "--clear-products":
            print("⚠️  Clearing products collection...")
            await clear_collection(PRODUCTS_COLLECTION)
            print("✅ Products collection cleared!")
            return
        elif sys.argv[1] == "--clear-categories":
            print("⚠️  Clearing categories collection...")
            await clear_collection(CATEGORIES_COLLECTION)
            print("✅ Categories collection cleared!")
            return
        elif sys.argv[1] == "--categories-only":
            await import_categories_to_mongodb()
            print("=" * 50)
            print("🎉 Categories import completed!")
            return
        elif sys.argv[1] == "--products-only":
            await import_products_to_mongodb()
            print("=" * 50)
            print("🎉 Products import completed!")
            return
    
    # Import both categories and products by default
    print("\n🏷️  Step 1: Importing Categories")
    print("-" * 30)
    await import_categories_to_mongodb()
    
    print("\n📦 Step 2: Importing Products")
    print("-" * 30)
    await import_products_to_mongodb()
    
    print("=" * 50)
    print("🎉 Import completed successfully!")
    print("\n💡 Usage options:")
    print("   python script.py --categories-only    # Import only categories")
    print("   python script.py --products-only      # Import only products")
    print("   python script.py --clear-all          # Clear all data")
    print("   python script.py --clear-products     # Clear only products")
    print("   python script.py --clear-categories   # Clear only categories")

if __name__ == "__main__":
    asyncio.run(main())