import mongoose from 'mongoose'

const connectDB = () => {
    mongoose.connect(process.env.MONGODB).then(() => {
        console.log('Data Base Is Connected');

    })
}

export default connectDB