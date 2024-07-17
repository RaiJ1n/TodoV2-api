const User = require('../model/UserModel')
const bcrypt = require('bcrypt')
const jwt = require ('jsonwebtoken');


exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hasshedPassword = await bcrypt.hash(password, 10);
        const newUser = new User ({
            name: name,
            email: email,
            password: hasshedPassword
        })
        await newUser.save();
        res.status(201).json({
            content: newUser, 
            message: "User created successfully"
        })

    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const checkUser = await User.findOne({ email }).exec();
        if (!checkUser) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        const passwordMatch = await bcrypt.compare(password, checkUser.password)
        if (!passwordMatch) {
            return res.status(400).json({
                message: "Password is incorrect"
            })
        }

        const accessToken = jwt.sign({ email: checkUser.email}, "My_Secret",{
            expiresIn: "1h"
        })
        res.cookie("jwt", accessToken,{
            httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
        })
        res.status(200).json({
            token: accessToken,
            message: "Login successful"
            })

    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}