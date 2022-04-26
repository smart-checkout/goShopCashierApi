const User = require("../models/User")
const { validationResult } = require('express-validator')
var jwt = require('jsonwebtoken')


exports.signup = (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: errors.array()[0].msg
        })
    }

    const user = new User(req.body)
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                error: "Unable to add user"
            })
        }

        return res.json({
            message: "Success",
            user
        })
    })
}


exports.signin = (req, res) => {
    const { email, password } = req.body

    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "Email was not found"
            })
        }

        // Authenticate user
        if (!user.authenticate(password)) {
            return res.status(400).json({
                error: "Email and password do not match"
            })
        }

        // Create token
        const token = jwt.sign({ _id: user._id }, 'bnar')

        // Put token in cookie
        res.cookie('token', token, { expire: new Date() + 1 })

        // Send response
        const { _id, name, email, createdAt } = user
        return res.json({
            token,
            user: {
                _id,
                name,
                email,
                createdAt
            }
        })

    })
}

exports.signout = (req, res) => {
    res.clearCookie("token")
    return res.json({
        message: "User siginout successful"
    })
}