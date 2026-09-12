import productModel from "../models/productModel.js";

const addProduct = async (req, res) => {
    try {
        const { name, description, price, image, category, subCategory, sizes, bestseller } = req.body;

        if (!name || !description || !price || !image || !category || !subCategory || !sizes) {
            return res.json({ success: false, message: "Please fill all required fields" });
        }

        const newProduct = new productModel({
            name,
            description,
            price: Number(price),
            image,
            category,
            subCategory,
            sizes,
            bestseller: bestseller || false,
            date: Date.now()
        });

        const product = await newProduct.save();

        res.json({ success: true, product });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const listProducts = async (req, res) => {
    try {
        const products = await productModel.find().sort({ date: -1 });
        res.json({ success: true, products });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productModel.findById(id);

        if (!product) {
            return res.json({ success: false, message: "Product not found" });
        }

        res.json({ success: true, product });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedProduct = await productModel.findByIdAndUpdate(
            id,
            { ...req.body, date: Date.now() },
            { new: true }
        );

        if (!updatedProduct) {
            return res.json({ success: false, message: "Product not found" });
        }

        res.json({ success: true, product: updatedProduct });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const removeProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedProduct = await productModel.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.json({ success: false, message: "Product not found" });
        }

        res.json({ success: true, message: "Product removed successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const getBestSellerProducts = async (req, res) => {
    try {
        const products = await productModel.find({ bestseller: true });
        res.json({ success: true, products });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export {
    addProduct,
    listProducts,
    getProductById,
    updateProduct,
    removeProduct,
    getBestSellerProducts
};