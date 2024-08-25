import mongoose, { Schema, models } from 'mongoose';

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'student',
    },
  },
  { timestamps: true }
);

const User = models.User || mongoose.model('User', userSchema);
export default User;