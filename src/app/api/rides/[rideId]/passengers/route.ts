import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Ride from '@/models/ride';
import { ObjectId } from 'mongodb';

export async function POST(
  request: Request,
  { params }: { params: { rideId: string } }
) {
  try {
    await dbConnect();
    const rideId = params.rideId;

    // For testing purposes, we'll use a fixed user ID
    const testUserId = '674759bc567b5039ccda0728';

    // Find the ride first to check if seats are available
    const ride = await Ride.findById(rideId).populate('passengers');
    
    if (!ride) {
      return NextResponse.json(
        { error: 'Ride not found' },
        { status: 404 }
      );
    }

    // Check if there are available seats
    if (ride.passengers.length >= ride.seats) {
      return NextResponse.json(
        { error: 'No seats available' },
        { status: 400 }
      );
    }

    // Check if user is already a passenger
    if (ride.passengers.some((passenger: { _id: { toString: () => string; }; }) => passenger._id.toString() === testUserId)) {
      return NextResponse.json(
        { error: 'User is already a passenger' },
        { status: 400 }
      );
    }

    // Add the passenger
    const updatedRide = await Ride.findByIdAndUpdate(
      rideId,
      { $push: { passengers: new ObjectId(testUserId) } },
      { 
        new: true, // Return the updated document
        runValidators: true
      }
    )
    .populate('driver', 'name email')
    .populate('passengers', 'name email')
    .populate('startLocation', 'LocationName Address')
    .populate('endLocation', 'LocationName Address')
    .lean();

    return NextResponse.json(updatedRide);
  } catch (error) {
    console.error('Error adding passenger:', error);
    return NextResponse.json(
      { error: 'Failed to add passenger' },
      { status: 500 }
    );
  }
}