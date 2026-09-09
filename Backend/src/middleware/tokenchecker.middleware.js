const jwt = require('jsonwebtoken')

const tokenChecker = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(200).json({
                user: null
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.user = decoded;

        if (decoded.role === "User") {
            return res.status(200).json({
                user: null
            });
        }
        next()
    } catch (err) {
        return res.status(200).json({
            user: null
        })
    }
}

module.exports = tokenChecker