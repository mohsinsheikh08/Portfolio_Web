const jwt = require('jsonwebtoken');

const tokenChecker = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(200).json({
                message: "No user logged in!",
                user: null
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.user = decoded;

        if (decoded.role !== "Admin") {
            return res.status(200).json({
                message: "Admin access required!"
            });
        }
        next();
    } catch (err) {
        return res.status(200).json({
            message: "Something is wrong!",
            user: null
        });
    }
};

module.exports = tokenChecker;