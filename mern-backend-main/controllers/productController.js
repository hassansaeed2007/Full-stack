import Product from "../models/productModel.js";
import ApiFeatures from "../utils/apiFeatures.js";

export const createProductController = async (req, res) => {
    try {
        // req.user.body = req.user.id
        // console.log(req.user.id);
        // console.log(req.body.user);
        req.body.user = req.user.id
        
        
        const product = await Product.create(req.body);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product Not created"
            })
        }
        return res.status(201).json({
            success: true,
            product
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error
        })
    }
}

export const getProductsController = async (req, res) => {
    try {
        const apiFunctionality = new ApiFeatures(Product.find(),req.query).search().filter().pagination()
        const products = await apiFunctionality.query;
        if (!products) {
            return res.status(400).json({
                success: false,
                message: "products not found"
            })
        }

        return res.status(200).json({
            success: true,
            products
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error
        })
    }
}

export const updateProductController = async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product Not Found"
            })
        }

        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        return res.status(200).json({
            success: true,
            product
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            error
        })

    }
}


export const deleteProductController = async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product Not Found"
            })
        }

        product = await Product.findByIdAndDelete(req.params.id)

        return res.status(200).json({
            success: true,
            product
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error
        })
    }
}

export const productDetailsController = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product Not Found"
            })
        }

        return res.status(200).json({
            success: true,
            product
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error
        })
    }
}

