import mongoose from 'mongoose'

export default class MongooseProvider {
  private static isConnected = false

  public async boot() {
    if (MongooseProvider.isConnected) {
      return
    }

    const uri = process.env.MONGO_URI || 'mongodb://louis:password@localhost:27017'
    try {
      await mongoose.connect(uri)
      MongooseProvider.isConnected = true
      console.log('MongoDB connected successfully')
    } catch (error) {
      console.error('Error connecting to MongoDB:', error)
    }
  }

  public async shutdown() {
    if (MongooseProvider.isConnected) {
      await mongoose.disconnect()
      MongooseProvider.isConnected = false
      console.log('MongoDB disconnected successfully')
    }
  }
}
