import ProductRepository from "./products.repository.js";

export default class ProductController{
    constructor(){
        this.productRepository=new ProductRepository();
    }

    async createProduct(req,res,next){
        try{
            const {name,quantity}=req.body;
            const product=await this.productRepository.createProduct(name,quantity);
            return res.status(200).send(product);
        }catch(err){
            console.log("Inside create product controller error");
            next(err);
        }
    }

    async getAllProduct(req,res,next){
        try{
            const product=await this.productRepository.getAllProduct();
            return res.status(200).send(product);
        }catch(err){
            console.log("Inside get all products controller error");
            next(err);
        }
    }

    async deleteProduct(req,res,next){
        try{
            const {id}=req.params;
            const deleted=await this.productRepository.deleteProduct(id);
            if(deleted>0){
                return res.status(200).send("Product deleted");
            }
            return res.status(400).send("Product not found");
        }catch(err){
            console.log("Inside deleted product controller error");
            next(err);
        }
    }

    async updateProduct(req,res,next){
        try{
            const {id}=req.params;
            const {number}=req.query;
            const result=await this.productRepository.updateProduct(id,number);
            if(result.updated){
                return res.status(200).send(result.message);
            }

            return res.status(400).send(result.message);
        }catch(err){
            console.log("Inside update product controller error");
            next(err);
        }
    }
}