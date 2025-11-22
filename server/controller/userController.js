import userModel from "../data-base/models/userModel.js"
import bcrypt from 'bcrypt'
import transporter from "../middleware/transpoter.js"
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    const { name, email, password } = req.body

    try {

        const existUser = await userModel.findOne({ email })
        if (existUser) {
            return res.json({ message: "user already Existed" })
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const user = await new userModel({ name, email, password: hashPassword })
        await user.save()

        const mailOptions = {
            from: process.env.SEND_MAIL,
            to: email,
            subject: 'Welcome Message',
            text: `Hey ${name} Welcome to our WebSite ${email} its Your Email ID`
        }

        await transporter.sendMail(mailOptions)

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

        // res.cookie('token', token, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === 'production',
        //     sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        //     maxAge: 7 * 24 * 60 * 60 * 1000

        // })

        return res.json({ success: true, message: "user registered" })

    } catch (error) {

        return res.json({ success: false, message: error.message })

    }
}

export const login = async (req, res) => {
    const { email, password } = req.body

    try {

        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: "user not found" })
        }

        const passDecode = await bcrypt.compare(password, user.password)
        if (!passDecode) {
            return res.json({ success: false, message: "Incorrect Password" })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.json({
            success: true, message: "User Login", user: {
                id: user._id,
                name: user.name,
                email: user.email,
                isVerified: user.isVerified
            }
        })

    } catch (error) {

        return res.json({ success: false, message: error.message })

    }
}

export const logout = (req, res) => {

    try {

        res.clearCookie('token', {
            httpOnly: true,
            secure: false,
            sameSite: true
        })
        return res.json({ success: true, message: "User Logout" })

    } catch (error) {

        return res.json({ success: false, message: error.message })

    }

}

export const sendVerifyOtp = async (req, res) => {
    const userId = req.user.id;

    try {

        const user = await userModel.findById(userId)
        if (!userId || !user) {
            return res.json({ success: false, message: "plz register" })
        }

        if (user.isVerified) {
            return res.json({ success: false, message: "User already Verifyed" })
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000))

        user.otp = otp
        await user.save()

        const mailOptions = {
            from: process.env.SEND_MAIL,
            to: user.email,
            subject: 'Verification OTP',
            text: `Your opt =${otp}`
        }

        await transporter.sendMail(mailOptions)

        res.json({ success: true, message: "Otp is Send" })

    } catch (error) {

        return res.json({ success: false, message: error.message })

    }
}

export const verifyEmail = async (req, res) => {
    const { otp } = req.body
    const userId = req.user.id

    try {

        if (!userId || !otp) {
            return res.json({ success: false, message: "Something Wrong oomb" })
        }

        const user = await userModel.findById(userId)
        if (!user) {
            return res.json({ success: false, message: "user is not existed" })
        }
        if (user.otp !== otp || user.otp === '') {
            return res.json({ success: false, message: "Otp is Missing" })
        }

        user.isVerified = true
        user.otp = ''
        await user.save()

        return res.json({ success: true, message: "User Verifyed" })

    } catch (error) {

        return res.json({ success: false, message: error.message })

    }
}

export const isLogedIn = (req, res) => {
    try {

        return res.json({ success: true })

    } catch (error) {

        return res.json({ success: false, message: error.message })

    }
}