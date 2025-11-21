import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import connectDB from './data-base/connectDB.js'
import userRouter from './routes/userRoutes.js'
import userFeaturesRouter from './routes/userFeaturesRoutes.js'
import cors from 'cors'

dotenv.config()

const app = express()

connectDB()

app.use(express.json())

app.use(cookieParser())

const frontEndURL = 'http://localhost:5173'

app.use(cors({
    origin: frontEndURL,
    credentials: true
}))

app.use('/api/user', userRouter)

app.use('/api/user/features', userFeaturesRouter)

app.listen(process.env.PORT, () => console.log(`http://localhost:${process.env.PORT}`))