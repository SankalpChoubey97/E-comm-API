import express from 'express';
import dotenv from 'dotenv';
import { connectToMongoDB } from './src/config/mongodb.js';
import { ApplicationError } from './src/error-handler/applicationError.js';
import productRouter from './src/features/products/products.router.js';

dotenv.config();

const server = express();

server.use(express.json());

server.use("/products",productRouter);

// Define a simple route
server.get('/', (req, res) => {
    res.send('Welcome to E comm API');
});

server.use((err,req,res,next)=>{

    if(err instanceof ApplicationError){
        res.status(err.code).send(err.message);
    }
    
    console.log("Inside application error handler");
    console.log(err);
    res.status(500).send("Something went wrong, please try later");
})

server.use((req, res) => {
    res.status(404).send("API not found");
});

// Start the server on port 3200

server.listen(3200, () => {
    console.log(`Server is running on 3200`);
    connectToMongoDB();
});
