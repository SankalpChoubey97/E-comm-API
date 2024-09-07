import { ObjectId } from 'mongodb';
import { getDB } from '../config/mongodb.js';
import { ApplicationError } from '../error-handler/applicationError.js';

export const validateProduct = async (req, res, next) => {
    try {
        const db = getDB();
        const productCollection = db.collection("products");

        const { name, quantity } = req.body;

        // Validate that name is defined and not empty
        if (!name || typeof name !== 'string' || name.trim() === '') {
            return res.status(400).send("name is required and should not be empty.");
        }

        // Validate that quantity is defined, is a number, and is not empty
        if (quantity === undefined || quantity === null || typeof quantity !== 'number') {
            return res.status(400).send("quantity is required and should be a number.");
        }

        // Convert the name to lowercase for comparison
        const lowercaseName = name.trim().toLowerCase();

        // Search the product collection by name in a case-insensitive manner
        const existingProduct = await productCollection.findOne({
            name: { $regex: `^${lowercaseName}$`, $options: 'i' }
        });

        // If a product with the same name exists, send a message
        if (existingProduct) {
            return res.status(409).send("Product with this name already exists.");
        }

        // If validation passes, proceed to the next middleware or route handler
        next();
    } catch (err) {
        // Handle any database errors
        throw new ApplicationError("Database issue", 500);
    }
};

export const validateID = (req, res, next) => {
    const { id } = req.params;

    // Check if the id is a valid ObjectId
    if (!ObjectId.isValid(id)) {
        return res.status(400).send("Invalid ID format" );
    }

    // If valid, proceed to the next middleware
    next();
};

export const updateQuery = (req, res, next) => {
    const { number } = req.query;

    // Check if number is not defined
    if (number === undefined) {
        return res.status(400).send("Number query parameter is required" );
    }

    // Check if number is not a valid number
    if (isNaN(number)) {
        return res.status(400).send("Query parameter 'number' must be a valid number" );
    }

    // Convert number to an actual number type
    req.query.number = Number(number);

    // Proceed to the next middleware or route handler
    next();
};



