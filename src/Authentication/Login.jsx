import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Landing from '../Components/Landing';
import { useNavigate } from 'react-router-dom'

function Login() {
    const navigate = useNavigate()
    const handleNavigate = () => {
        navigate('/landing')
    }
    return (
        <div className="container mt-5" style={{ minWidth: '350px' }}>
            <div className="d-flex justify-content-center">
                <div className="">
                    <div className="card" style={{ minWidth: '350px' }}>
                        <div className="card-header text-white bg-primary">
                            <h5 className="card-title mb-0">Login</h5>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="form-floating mb-3">
                                    <input type="email" className="form-control" id="loginEmail" placeholder="name@example.com" required />
                                    <label htmlFor="loginEmail">Email address</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input type="password" className="form-control" id="loginPassword" placeholder="Password" required />
                                    <label htmlFor="loginPassword">Password</label>
                                </div>
                            </form>
                            <button type="submit" className="btn btn-primary w-100" onClick={handleNavigate}>Login</button>
                            <sm>Do not have an account? <a href='/register'>Register Here</a></sm>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
