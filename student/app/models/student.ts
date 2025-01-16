import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  genre: { type: Boolean, required: true},
  SchoolId: { type: BigInt, required: true },
}, { timestamps: true })

export default mongoose.model('Student', UserSchema)
