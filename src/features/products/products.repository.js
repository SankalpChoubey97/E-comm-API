import { getDB } from "../../config/mongodb.js";
import { ObjectId } from "mongodb";
import { ApplicationError } from "../../error-handler/applicationError.js";

export default class ProductRepository{
    async createProduct(name,quantity){
        try{
            const db=getDB();
            const productCollection=db.collection("products");
            const product={
                name,
                quantity
            }

            //add product to product collection
            await productCollection.insertOne(product);

            return product;
        }catch(err){
            throw new ApplicationError("Database issue", 500);
        }
    }

    async getAllProduct() {
        try {
            const db = getDB();
            const productCollection = db.collection("products");
    
            // Fetch all products from the collection
            const products = await productCollection.find({}).toArray();
    
            // Return the products
            return products;
        } catch (err) {
            throw new ApplicationError("Database issue", 500);
        }
    }

    async deleteProduct(id) {
        try {
            const db = getDB();
            const productCollection = db.collection("products");

            // Delete the product with the matching _id and get the result
            const result = await productCollection.deleteOne({ _id: new ObjectId(id) });

            // Return the count of deleted documents
            return result.deletedCount;
        } catch (err) {
            throw new ApplicationError("Database issue", 500);
        }
    }

    async updateProduct(id, number) {
        try {
            const db = getDB();
            const productCollection = db.collection("products");
    
            // Convert the id to an ObjectId
            const objectId = new ObjectId(id);
    
            // Find the product with the matching _id
            const product = await productCollection.findOne({ _id: objectId });
    
            // If no product is found, return an error result
            if (!product) {
                return { updated: false, message: "No product found" };
            }
    
            // Determine the new quantity based on the number parameter
            let newQuantity = product.quantity + number;
    
            // If number is positive, just update the quantity
            if (number > 0) {
                await productCollection.updateOne(
                    { _id: objectId },
                    { $set: { quantity: newQuantity } }
                );
            } else if (number < 0) {
                // If number is negative, check if there are enough items to remove
                if (newQuantity < 0) {
                    return { updated: false, message: "Items removed are more than that in cart" };
                } else {
                    await productCollection.updateOne(
                        { _id: objectId },
                        { $set: { quantity: newQuantity } }
                    );
                }
            }
    
            // Return success result
            return { updated: true, message: "Updated successfully" };
        } catch (err) {
            // Handle any errors
            throw new ApplicationError("Database issue", 500);
        }
    }

    
}