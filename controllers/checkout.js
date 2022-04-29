const checkout = require("../models/Checkout")

exports.listByUserId = (req, res) => {
    checkout.find({ userID: req.body.id }, (err, checkoutList) => {
        if (err) {
            return res.status(400).json({
                code: 400,
                error: "an error occured"
            })
        }
        if (!checkoutList) {
            return res.json({
                code: 204,
                message: "product not found"
            })
        }
        return res.json({
            checkoutList
        })

    })
}
exports.addcheckout = (req, res) => {
    const product = new checkout(req.body)
    product.save((err, product) => {
        if (err) {
            return res.status(400).json({
                error: "Unable to add user"
            })
        }

        return res.json({
            message: "Success",
            checkout
        })
    })
}