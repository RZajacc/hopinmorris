import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { IUser, ILocation } from '@/types';
import Ride from '@/models/ride';

export async function GET() {
  try {
    await dbConnect();
    
    const rides = await Ride.find()
      .populate<{ driver: IUser }>('driver', 'name email')
      .populate<{ passengers: IUser[] }>('passengers', 'name email')
      .populate<{ startLocation: ILocation }>('startLocation', 'LocationName')
      .populate<{ endLocation: ILocation }>('endLocation', 'LocationName')
      .lean()
      .exec();

    
    const formattedRides = rides.map((ride) => ({
      ...ride,
      departureTime: ride.departureTime
        ? new Date(ride.departureTime.t * 1000)
        : null,
    }));


    if (!formattedRides) {
      return NextResponse.json({ error: 'No rides found' }, { status: 404 });
    }

    return NextResponse.json(formattedRides);
  } catch (error) {
    console.error('Error fetching rides:', error);
    return NextResponse.json(
      { error: 'Failed to fetch rides' },
      { status: 500 }
    );
  }
}