import { ProductType } from "../models/productType.js";
import { internalServerError, notFoundError } from '../utils/errors.js';


export const createProductType = async (req, res) => {
    try {
        const productType = new ProductType(req.body);
        await productType.save();
        return res.status(201).json(productType);
    } catch (error) {
        return internalServerError(res, error.message);
    }
};

export const updateProductType = async (req, res) => {
    try {
        const _id = req.params.id;
        const updatedProductType = await ProductType.findOneAndUpdate({ _id }, req.body, { new: true });
        if (!updatedProductType) {
            return notFoundError(res, 'Product type not found');
        }
        return res.status(200).json(updatedProductType);
    } catch (error) {
        return internalServerError(res, error.message);
    }
};

export const deleteProductType = async (req, res) => {
    try {
        const productType = await ProductType.findByIdAndDelete(req.params.id);
        if (!productType) {
            return notFoundError(res, 'Product type not found');
        }
        return res.status(200).json({ message: 'Product type deleted' });
    } catch (error) {
        return internalServerError(res, error.message);
    }
};

export const getProductTypes = async (req, res) => {
    try {
        const productTypes = await ProductType.find().sort({ name: 1 });
        return res.status(200).json(productTypes);
    } catch (error) {
        return internalServerError(res, error.message);
    }
};

export const getProductType = async (req, res) => {
    try {
        const productType = await ProductType.findById(req.params.id);
        if (!productType) {
            return notFoundError(res, 'Product type not found');
        }
        return res.status(200).json(productType);
    } catch (error) {
        return internalServerError(res, error.message);
    }
};