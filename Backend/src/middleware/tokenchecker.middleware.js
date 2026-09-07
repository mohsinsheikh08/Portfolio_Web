const jwt = require('jsonwebtoken')
const tokenChecker = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "Authentication required! Please login first."
            });
        }


        const decoded = jwt.verify(token, process.env.JWT_KEY);

        req.user = decoded

        if (decoded.role === "User") {
            return res.status(409).json({
                message: "This page can only access admin!"
            })
        }
        next()
    } catch (err) {
        return res.status(409).json({
            message: "Something is wrong!",
            Error: err.message
        })
    }
}

module.exports = tokenChecker