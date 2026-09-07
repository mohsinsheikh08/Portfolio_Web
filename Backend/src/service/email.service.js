const nodemailer = require('nodemailer')

const sendEmail = async ({to, subject, html}) => {
    try{
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASS
            }
        })

        const mailOptions = {
            from: process.env.EMAIL,
            to, 
            subject,
            html
        }

        const info = await transporter.sendMail(mailOptions)

        console.log('Email Sent:', info.messageId);
        return info
    }catch(err){
        console.log("Something is wrong:" + err.message)
    }
}

module.exports = sendEmail