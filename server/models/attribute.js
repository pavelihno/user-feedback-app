import mongoose from 'mongoose';


const attributeTypes = ['text', 'integer', 'float', 'location', 'boolean', 'date', 'enum', 'list'];

export const attributeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    key: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: attributeTypes,
    },
    options: {
        type: [String],
        default: undefined,
        required: function () {
            return this.type === 'enum';
        },
    },
});

attributeSchema.statics.getAttributeTypes = () => { return attributeTypes };

export const Attribute = mongoose.model('Attribute', attributeSchema);