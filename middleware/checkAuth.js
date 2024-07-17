const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.verifyToken = async (req, res, next) =>{
    try {
        const cookies = req.cookies["jwt"]
        jwt.verify(cookies, "My_Secret", (err, user) => {
            if (err) return res.status(401)
                req.user = user
                next()
                console.log("Token is correct and not expired");
        })
    } catch (error) {
        res.status(404).json({
            message: err.message
          });
    }
}