import mongoose from 'mongoose'

export const connectMongoDB = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('connected to db')
    } catch (error) {
        console.log('error connecting: ', error)

    }
}