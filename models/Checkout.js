const mongoose = require("mongoose")

const checkoutSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    products: [{
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
})

module.exports = mongoose.model("Checkout", checkoutSchema, 'checkout')