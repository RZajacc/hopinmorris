import mongoose from 'mongoose';

const rideSchema = new mongoose.Schema(
  {
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    startLocation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Location',
    },
    endLocation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Location',
    },
    departureTime: {
      type: mongoose.Schema.Types.Date,
    },
    seats: {
      type: Number,
      required: true,
    },
    passengers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

const Ride = mongoose.models.Ride || mongoose.model('Ride', rideSchema);

export default Ride;
