import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: ({ type: String, required: true }),
    email: ({ type: String, required: true, unique: true }),
    password: ({ type: String, required: true }),
    otp: ({ type: String, default: '' }),
    otpExpiry: ({ type: Date, default: null }),
    isVerified: ({ type: Boolean, default: false })
})

const userModel = new mongoose.model('userModel', userSchema)

export default userModel