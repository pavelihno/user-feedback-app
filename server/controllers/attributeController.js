import { Attribute } from '../models/attribute.js';
import { internalServerError } from '../utils/errors.js';


export const getAttributeTypes = async (req, res) => {
    try {
        const types = Attribute.getAttributeTypes();
        return res.status(200).json(types);
    } catch (error) {
        return internalServerError(res, error.message);
    }
};