import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GoogleMap, LoadScript, Polyline } from '@react-google-maps/api';

const JourneyHistory = ({ userId }) => {
  const [journeys, setJourneys] = useState([]);

  useEffect(() => {
    axios.get(`/journeys/${userId}`).then(response => setJourneys(response.data));
  }, [userId]);

  return (
    <div>
      {journeys.map(journey => (
        <div key={journey._id}>
          <h3>Journey from {journey.startLocation} to {journey.endLocation}</h3>
          <LoadScript googleMapsApiKey="">
            <GoogleMap
              mapContainerStyle={{ height: "400px", width: "800px" }}
              center={{ lat: 0, lng: 0 }}
              zoom={8}
            >
              <Polyline
                path={journey.route.map(coord => ({ lat: coord.lat, lng: coord.lng }))}
                options={{ strokeColor: "#FF0000" }}
              />
            </GoogleMap>
          </LoadScript>
        </div>
      ))}
    </div>
  );
};

export default JourneyHistory;
