import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useGps } from './GPSContext.js';
import HomePage from './Components/Homepage.jsx';

function App() {
  const [longi, setLongi] = useState(null)
  const { gpsEnabled, setGpsEnabled, gpsError, setGpsError } = useGps();
  const [lat, setLat] = useState(null)

  useEffect(() => {
    if (gpsEnabled) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('GPS coordinates:', position.coords.latitude, position.coords.longitude);
          setLat(position.coords.latitude)
          setLongi(position.coords.longitude)
          // Redirect to the homepage after getting the coordinates
        },
        (error) => {
          setGpsError('Failed to retrieve GPS coordinates. Please enable GPS.');
          console.error('Error retrieving GPS:', error);
          setGpsEnabled(false);
        }
      );
    }
  }, [gpsEnabled]);

  const handleAllowGps = () => {
    setGpsEnabled(true);
  };

  return (
    <div className="bg-light min-vh-100" style={{minWidth:'350px'}}>
      {/* Conditionally render the modal */}
      {!gpsEnabled ?
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
        : <HomePage lat={lat} longi={longi} />}
    </div>
  );
}

export default App;
