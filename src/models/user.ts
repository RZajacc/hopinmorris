import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    carBrand: {
      type: String,
    },
    carLicencePlate: {
      type: String,
    },
    rides: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ride' }],
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
