// src/GpsContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a Context for the GPS state
const GpsContext = createContext();

// Create a Provider component
export const GpsProvider = ({ children }) => {
  const [gpsEnabled, setGpsEnabled] = useState(false);
  const [gpsError, setGpsError] = useState(null);
  const [lat, setLat] = useState(null)
  const [longi, setLongi] = useState(null)

  useEffect(() => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // console.log('GPS coordinates:', position.coords.latitude, position.coords.longitude);
          setLat(position.coords.latitude)
          setLongi(position.coords.longitude)
          setGpsEnabled(true);
          // Redirect to the homepage after getting the coordinates
        },
        (error) => {
          setGpsError('Failed to retrieve GPS coordinates. Please enable GPS.');
          console.error('Error retrieving GPS:', error);
          setGpsEnabled(false);
        }
      );
  }, [gpsEnabled]);
  const handleAllowGps = () => {
    setGpsEnabled(true);
  };
  return (
    <GpsContext.Provider value={{ gpsEnabled, setGpsEnabled, gpsError, setGpsError, lat, longi }}>
      {
        !gpsEnabled &&
        (
          <div className="modal show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Enable GPS</h5>
                </div>
                <div className="modal-body">
                  <p>Please enable GPS to proceed.</p>
                  {gpsError && <div className="alert alert-danger">{gpsError}</div>}
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setGpsError(null)}>
                    Close
                  </button>
                  <button type="button" className="btn btn-primary" onClick={handleAllowGps}>
                    <i className="bi bi-geo-alt-fill"></i> Allow GPS
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      }
      {children}
    </GpsContext.Provider>
  );
};

// Custom hook to use the GpsContext
export const useGps = () => {
  return useContext(GpsContext);
};
