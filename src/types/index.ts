import mongoose from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  carBrand?: string;
  carLicencePlate?: string;
  rides: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ILocation extends Document {
  LocationName: string;
  Address: string;
  Latitude: string;
  Longtitude: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IRide extends Document {
  driver: mongoose.Types.ObjectId | IUser;
  startLocation: mongoose.Types.ObjectId | ILocation;
  endLocation: mongoose.Types.ObjectId | ILocation;
  departureTime: Date;
  seats: number;
  passengers: mongoose.Types.ObjectId[] | IUser[];
  createdAt: Date;
  updatedAt: Date;
}

export interface SimpleLocation {
  _id: string;
  LocationName: string;
  Address: string;
}

export interface RideWithLocations {
  _id: string;
  startLocation: SimpleLocation;
  endLocation: SimpleLocation;
  departureTime: Date;
  seats: number;
  driver: {
    _id: string;
    name?: string;
    email: string;
  };
  passengers: Array<{
    _id: string;
    name?: string;
    email: string;
  }>;
}