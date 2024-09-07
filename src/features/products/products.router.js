import express from "express";
import ProductController from "./products.controller.js";
import { validateProduct,validateID,updateQuery} from "../../middleware/products.middleware.js";

const productRouter=express.Router();
const productController=new ProductController();

productRouter.post("/create",validateProduct,(req,res,next)=>{
    productController.createProduct(req,res,next)});

productRouter.get("/",(req,res,next)=>{
    productController.getAllProduct(req,res,next)});

productRouter.delete("/:id",validateID,(req,res,next)=>{
    productController.deleteProduct(req,res,next)});

productRouter.post("/:id/update_quantity/",validateID,updateQuery,(req,res,next)=>{
    productController.updateProduct(req,res,next)})

export default productRouter;