// lib/models.ts
import mongoose from 'mongoose';
import { IUser, ILocation, IRide } from '@/types';

// User Schema
const UserSchema = new mongoose.Schema<IUser>(
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

// Location Schema
const LocationSchema = new mongoose.Schema<ILocation>(
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
  { timestamps: true }
);

// Ride Schema
const RideSchema = new mongoose.Schema<IRide>(
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
      type: Date,
    },
    seats: {
      type: Number,
      required: true,
    },
    passengers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

// This ensures models are registered only once
export const User = mongoose.models?.User || mongoose.model('User', UserSchema);
export const Location = mongoose.models?.Location || mongoose.model('Location', LocationSchema);
export const Ride = mongoose.models?.Ride || mongoose.model('Ride', RideSchema);

export const Models = { User, Location, Ride };