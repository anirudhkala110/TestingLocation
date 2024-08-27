import React, { useEffect, useState } from 'react';
import { useGps } from '../GPSContext.js';
import SignUp from '../Authentication/Signup.jsx';
import Login from '../Authentication/Login.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './Landing.jsx';
import Profile from './DeliveryBoy/Profile.jsx';
import OwnerProfile from './Owner/Profile.jsx';
import axios from 'axios'

function HomePage() {
    const { gpsEnabled } = useGps();
    const [location, setLocation] = useState({ lat: null, longi: null });
    const [signUp, setSignUp] = useState(false)
    const [msg, setMsg] = useState(null)

    useEffect(() => {
        if (gpsEnabled) {
            const interval = setInterval(() => {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setLocation({
                            lat: position.coords.latitude,
                            longi: position.coords.longitude
                        });
                        axios.post('https://dashboard.basic2ai.info/api/location', {
                            lat: position.coords.latitude,
                            longi: position.coords.longitude
                        })
                            .then(res => {
                                setMsg(res.data.msg)
                            })
                            .catch(err => {
                                console.log(err)
                            })
                        axios.post('http://localhost:5001/api/location', {
                            lat: position.coords.latitude,
                            longi: position.coords.longitude
                        })
                            .then(res => {
                                setMsg(res.data.msg)
                            })
                            .catch(err => {
                                console.log(err)
                            })
                    },
                    (error) => {
                        console.error('Error retrieving GPS:', error);
                    }
                );
            }, 30000);

            return () => clearInterval(interval);
        }
    }, [gpsEnabled]);

    return (
        <div className="container-fluid" style={{ minWidth: '370px', width: '100%' }}>
            <div className="justify-content-center">
                <div className="w-100">
                    <div className="card shadow">
                        <div className="card-body">
                            {gpsEnabled ? (
                                <div>
                                    {msg && <center>{msg}</center>}
                                    <div className='px-2' style={{ minWidth: '350px' }}>
                                        <div className="card-header bg-secondary text-white mb-2">
                                            <h5 className="card-title mb-0">Home Page</h5>
                                        </div>
                                        <div className='px-3'>
                                            <h6 className="card-subtitle mb-2 text-muted">GPS Enabled</h6>
                                            <p className="card-text">
                                                <strong>Latitude:</strong> {location.lat ? location.lat.toFixed(6) : 'Fetching...'}
                                            </p>
                                            <p className="card-text">
                                                <strong>Longitude:</strong> {location.longi ? location.longi.toFixed(6) : 'Fetching...'}
                                            </p>
                                        </div>
                                    </div>
                                    <hr />
                                    {
                                        <Router>
                                            <Routes>
                                                <Route exact path='/' element={<Login />} />
                                                <Route exact path='/login' element={<Login />} />
                                                <Route exact path='/register' element={<SignUp />} />
                                                <Route path='/landing' element={gpsEnabled ? <Landing /> : <Login />} />
                                                <Route path='/delivery_profile' element={gpsEnabled ? <Profile /> : <Login />} />
                                                <Route path='/owner_profile' element={gpsEnabled ? <OwnerProfile /> : <Login />} />
                                            </Routes>
                                        </Router>
                                    }
                                </div>
                            ) : (
                                <div className="alert alert-warning" role="alert">
                                    GPS is not enabled. Please enable GPS to access all features.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
