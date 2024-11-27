'use client';

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast"
import { formatDateString } from '@/lib/utils';
import { RideWithLocations } from "@/types";

export default function Rides() {
  const [rides, setRides] = useState<RideWithLocations[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast()
  
  // Our test user ID - in a real app, this would come from authentication
  const TEST_USER_ID = '674759bc567b5039ccda0728';

  // Helper function to check if the user has already joined a ride
  const hasUserJoined = (ride: RideWithLocations): boolean => {
    return ride.passengers.some(passenger => passenger._id === TEST_USER_ID);
  };

  // Helper function to get the button state for a ride
  const getButtonState = (ride: RideWithLocations) => {
    if (hasUserJoined(ride)) {
      return {
        text: '✓ Joined',
        disabled: true,
        className: 'bg-green-600 hover:bg-green-600 cursor-default'
      };
    }
    
    const availableSeats = ride.seats - (ride.passengers?.length || 0);
    if (availableSeats <= 0) {
      return {
        text: 'Full',
        disabled: true,
        className: 'bg-gray-400 hover:bg-gray-400 cursor-not-allowed'
      };
    }
    
    return {
      text: 'Join Ride',
      disabled: false,
      className: ''
    };
  };

  const fetchRides = async () => {
    try {
      const response = await fetch('/api/rides');
      if (!response.ok) {
        throw new Error('Failed to fetch rides');
      }
      const data = await response.json();
      setRides(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load rides');
    }
  };

  useEffect(() => {
    fetchRides();
  }, []);

  const handleJoinRide = async (rideId: string) => {
    // Don't proceed if user has already joined
    const ride = rides.find(r => r._id === rideId);
    if (ride && hasUserJoined(ride)) {
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`/api/rides/${rideId}/passengers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to join ride');
      }

      await fetchRides(); // Refresh the rides list
      
      toast({
        title: "Success!",
        description: "You have successfully joined the ride.",
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to join ride';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Available Rides</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {rides.map((ride) => {
          const buttonState = getButtonState(ride);
          
          return (
            <Card 
              key={ride._id.toString()} 
              className="shadow-lg transition-shadow"
            >
              <CardHeader>
                <CardTitle className="text-lg">
                  {ride.startLocation?.LocationName || 'Loading...'} → {ride.endLocation?.LocationName || 'Loading...'}
                </CardTitle>
                {ride.departureTime && (
                  <p className="text-sm text-muted-foreground">
                    Departure: {ride.departureTime ? formatDateString(ride.departureTime) : "Unknown"}
                  </p>
                )}
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {ride.startLocation?.Address && (
                    <p className="text-sm">
                      <span className="font-semibold">From:</span> {ride.startLocation.Address}
                    </p>
                  )}
                  {ride.endLocation?.Address && (
                    <p className="text-sm">
                      <span className="font-semibold">To:</span> {ride.endLocation.Address}
                    </p>
                  )}
                  <p className="text-sm">
                    <span className="font-semibold">Available Seats:</span> {ride.seats - (ride.passengers?.length || 0)} / {ride.seats}
                  </p>
                  {ride.driver && (
                    <p className="text-sm">
                      <span className="font-semibold">Driver:</span> {ride.driver.name || ride.driver.email}
                    </p>
                  )}
                  
                  <Button
                    className={`w-full mt-4 ${buttonState.className}`}
                    onClick={() => handleJoinRide(ride._id.toString())}
                    disabled={buttonState.disabled || loading}
                  >
                    {loading ? 'Processing...' : buttonState.text}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}