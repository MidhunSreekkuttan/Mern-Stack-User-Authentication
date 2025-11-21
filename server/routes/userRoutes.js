import express from 'express'
import { isLogedIn, login, logout, register, sendVerifyOtp, verifyEmail } from '../controller/userController.js'
import userAuth from '../middleware/userAth.js'

const userRouter = express.Router()

userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.post('/logout', logout)
userRouter.post('/sendVerifyOtp', userAuth, sendVerifyOtp)
userRouter.post('/verify-email', userAuth, verifyEmail)
userRouter.get('/isLogedIn', userAuth, isLogedIn)

export default userRouter