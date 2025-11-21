import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 500,
    secure: false,
    auth: {
        user: process.env.SEND_MAIL,
        pass: process.env.PASS
    }
})

export default transporter