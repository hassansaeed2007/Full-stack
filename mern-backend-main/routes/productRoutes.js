import express from "express";
import { createProductController, deleteProductController, getProductsController, productDetailsController, updateProductController } from "../controllers/productController.js";
import { isAdmin, isAuthenticatedUser } from "../utils/userAuth.js";
const productRouter = express.Router();

productRouter.post("/create-product", isAuthenticatedUser, isAdmin("admin"), createProductController)
productRouter.get("/get-all-products", getProductsController)
productRouter.put("/update-product/:id", isAuthenticatedUser, isAdmin("admin"), updateProductController)
productRouter.delete("/delete-product/:id", isAuthenticatedUser, isAdmin("admin"), deleteProductController)
productRouter.get("/product-detail/:id", productDetailsController)
export default productRouter