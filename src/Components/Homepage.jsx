import React, { useEffect, useState } from 'react';
import { useGps } from '../GPSContext.js';
import SignUp from '../Authentication/Signup.jsx';
import Login from '../Authentication/Login.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './Landing.jsx';
import Profile from './DeliveryBoy/Profile.jsx';
import OwnerProfile from './Owner/Profile.jsx';
import axios from 'axios'

axios.defaults.withCredentials = true

function HomePage() {
    const { gpsEnabled, lat, longi } = useGps();
    console.log(lat, longi)
    const [msg, setMsg] = useState(null)
    useEffect(() => {
        let interval;
        if (gpsEnabled) {
            interval = setInterval(() => {
                axios.post('https://dashboard.basic2ai.info/api/location', {
                    lat: lat,
                    longi: longi
                })
                    .then(res => {
                        setMsg(res.data.msg);
                    })
                    .catch(err => {
                        console.log(err);
                    });

                axios.post('http://localhost:5001/api/location', {
                    lat: lat,
                    longi: longi
                })
                    .then(res => {
                        setMsg(res.data.msg);
                    })
                    .catch(err => {
                        console.log(err);
                    });

                axios.get('https://dashboard.basic2ai.info/location/get')
                    .then(res => {
                        console.log(res.data);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }, 30000);
        }

        return () => {
            setMsg(null)
            clearInterval(interval)
        };
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
                                                <strong>Latitude:</strong> {lat ? lat : 'Fetching...'}
                                            </p>
                                            <p className="card-text">
                                                <strong>Longitude:</strong> {longi ? longi : 'Fetching...'}
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
