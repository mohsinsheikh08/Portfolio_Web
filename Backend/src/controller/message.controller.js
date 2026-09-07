const messageModel = require('../models/message.model.js');
const sendEmail = require('../service/email.service.js');
const jwt = require('jsonwebtoken')
const sendMessage = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        const newMessage = await messageModel.create({
            name,
            email,
            subject,
            message
        })

        await sendEmail({
            to: process.env.EMAIL,
            subject: `New Contact Message ${subject}`,
            html: `
                 <h2>New Message from ${name}</h2>
                 <h2>Email: ${email}</h2>
                 <h2>Subject: ${subject}</h2>
                 <h2>Message: ${message}</h2>
            `
        })

        await sendEmail({
            to: email,
            subject: "Thanks for contacting me!",
            html: `
            <h2>Hi ${name},</h2>
                <p>Thank you for reaching out. I'll get back to you soon.</p>
            `
        })
        return res.status(201).json({
            message: "Message sent successfully!",
            data: newMessage
        });

    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong!",
            Error: error.message
        });
    }
}

const getMessage = async (req, res) => {
    try {
        const messages = await messageModel.find().sort({ createdAt: -1 })

        return res.status(200).json({
            message: "All messages are fetched!",
            messages: messages
        })
    } catch (err) {
        return res.status(409).json({
            message: "Something is wrong!",
            Error: err.message
        })
    }
}

const deleteMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteMessage = await messageModel.findByIdAndDelete(id);
        return res.status(200).json({
            message: "Message deleted successfully!",
            DeleteMessage: deleteMessage
        })
    } catch (err) {
        return res.status(409).json({
            message: "Something is wrong!",
            Error: err.message
        })
    }
}

module.exports = { sendMessage, getMessage, deleteMessage }