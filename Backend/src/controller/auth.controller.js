const userModel = require('../models/auth.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userRegister = async (req, res) => {
    try {
        const { fullName: { firstName, lastName }, email, password } = req.body;
        const isEmailExist = await userModel.findOne({ email });

        if (isEmailExist) {
            return res.status(400).json({ message: "Email already exists" });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const isRole = email === "mohsinshahidsheikh1@gmail.com" ? "Admin" : "User";
        const user = await userModel.create({
            fullName: {
                firstName: firstName,
                lastName: lastName
            },
            email: email,
            password: hashPassword,
            role: isRole
        });

        const token = jwt.sign({
            id: user._id,
            role: isRole,
            email: user.email
        }, process.env.JWT_KEY,
            { expiresIn: '7d' }
        );
        res.cookie("token", token, {
            httpOnly: false,
            secure: true,
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.status(201).json({
            message: `${isRole} Registered Successfully!`,
            UserDetail: user
        });
    } catch (err) {
        return res.status(409).json({
            message: "Something is wrong!",
            Error: err.message
        });
    }
};

const getMe = async (req, res) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(200).json({
                message: "No user logged in!",
                user: null
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const userId = decoded.id;
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(200).json({
                message: "User not found!",
                user: null
            });
        }
        return res.status(200).json({
            message: "User fetched successfully!",
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        return res.status(200).json({
            message: "Something is wrong!",
            user: null
        });
    }
};

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found!"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid Password!"
            });
        }

        const isRole = email === "mohsinshahidsheikh@gmail.com" ? "Admin" : "User";

        const token = jwt.sign({
            id: user._id,
            role: user.role,
            email: user.email
        }, process.env.JWT_KEY,
            { expiresIn: '7d' }
        );

        res.cookie("token", token, {
            httpOnly: false,
            secure: true,
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000
        });
        return res.status(200).json({
            message: `${isRole} Logged In Successfully!`,
            UserDetail: user
        });
    } catch (err) {
        return res.status(409).json({
            message: "Something is wrong!",
            Error: err.message
        });
    }
};

const userLogout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: false,
            secure: true,
            sameSite: "none",
            path: '/'
        });
        return res.status(200).json({
            message: "User Logged Out Successfully!"
        });
    } catch (err) {
        return res.status(409).json({
            message: "Something is wrong!",
            Error: err.message
        });
    }
};

module.exports = { userRegister, userLogin, userLogout, getMe };