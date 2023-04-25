import mongoose from 'mongoose';


const attributeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ['text', 'number', 'location', 'boolean', 'date', 'enum'],
    },
});

const Attribute = mongoose.model('Attribute', attributeSchema);

export { Attribute, attributeSchema };