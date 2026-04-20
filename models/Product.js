const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
        min: 0
    },
    description: {
        type: String,
        required: false,
        trim: true
    }
}, {
    timestamps: true  // Adds createdAt and updatedAt automatically
});

module.exports = mongoose.model('Product', productSchema);