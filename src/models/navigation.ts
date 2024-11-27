import mongoose from "mongoose";

const locationSchema = new mongoose.Schema(
  {
    LocationName: {
      type: String,
      required: true,
    },
    Address: {
      type: String,
      required: true,
    },
    Latitude: {
      type: String,
      required: true,
    },
    Longtitude: {
      type: String,
      required: true,
    },
  },
  { 
    timestamps: true
  }
);

const Location = mongoose.models.Location || mongoose.model('Location', locationSchema);

export default Location;