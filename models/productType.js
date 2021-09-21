const mongoose = require('mongoose');

const productTypeSchema = new mongoose.Schema({
    productType: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    }
});

const productTypeModel = mongoose.model('productType', productTypeSchema);

module.exports = productTypeModel;