const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    productType: {
        type: String,
        required: true,
        trim: true,
        ref: 'ProductType'
    },
    productName: {
        type: String,
        minLength: 3,
        required: true,
        trim: true
    },
    expiryDate: {
        type: Date,
        required: true
    },
    price: {
        type: Number,
        default: 0,
    },
    likes: {
        type: Number,
        default: 0
    },
    // comments: [{
    //     comment: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'Comment'
    //     }
    // }],
    comments: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { timestamps: { createdAt: 'created_at' } });

const productModel = mongoose.model('product', productSchema);

module.exports = productModel