import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  room: {
    type: Number,
  },
},
  {
    timestamps: true,
  }
)

const User = model('pacientes', userSchema)
export default User