import { Product } from "../models/product.js";
import { internalServerError, notFoundError } from '../utils/errors.js';


export const createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        return res.status(201).json(product);
    } catch (error) {
        return internalServerError(res, error.message);
    }
};

export const updateProduct = async (req, res) => {
    try {
        const _id = req.params.id;
        const updatedProduct = await Product.findOneAndUpdate({ _id }, req.body, { new: true });
        if (!updatedProduct) {
            return notFoundError(res, 'Product not found');
        }
        return res.status(200).json(updatedProduct);
    } catch (error) {
        return internalServerError(res, error.message);
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return notFoundError(res, 'Product not found');
        }
        return res.status(200).json({ message: 'Product deleted' });
    } catch (error) {
        return internalServerError(res, error.message);
    }
};

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('productType');
        return res.status(200).json(products);
    } catch (error) {
        return internalServerError(res, error.message);
    }
};

export const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('productType').populate('reviews').populate('submittedBy');
        if (!product) {
            return notFoundError(res, 'Product not found');
        }
        return res.status(200).json(product);
    } catch (error) {
        return internalServerError(res, error.message);
    }
};