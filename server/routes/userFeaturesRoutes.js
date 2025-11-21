import express from 'express'
import { getUser } from '../controller/userFeatureController.js'
import userAuth from '../middleware/userAth.js'

const userFeaturesRouter = express.Router()

userFeaturesRouter.get('/getUser', userAuth, getUser)
//userFeaturesRouter.post('/userDelete')
//userFeaturesRouter.post('/userEdit')
//userFeaturesRouter.post('/search')

export default userFeaturesRouter