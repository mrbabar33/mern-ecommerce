import express from "express";
import {
	addProduct,
	listProducts,
	getProductById,
	updateProduct,
	removeProduct,
	getBestSellerProducts
} from "../controllers/productController.js";
import adminAuth from "../middlewares/adminAuth.js";

const productRouter = express.Router();

productRouter.get("/list", listProducts);
productRouter.get("/bestsellers", getBestSellerProducts);
productRouter.get("/:id", getProductById);
productRouter.post("/add", adminAuth, addProduct);
productRouter.put("/:id", adminAuth, updateProduct);
productRouter.delete("/:id", adminAuth, removeProduct);

export default productRouter;
