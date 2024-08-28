import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Landing from '../Components/Landing';
import { useNavigate } from 'react-router-dom'

function Login() {
    const [loginData, setLoginData] = useState({
        email: '',
        phone: '',
        password: '',
        uniqueID: ''
    })
    const [msg, setMsg] = useState(null)
    const handleLength = (e, len) => {
        if (e.target.value.length > len) {
            alert(`This could not exceeds the limit of ${len}`)
            setLoginData({ ...loginData, phone: loginData.phone })
        }
        else {
            setLoginData({ ...loginData, phone: e.target.value })
        }
    }
    const navigate = useNavigate()
    const handleSubmit = () => {
        if (loginData.phone.length != 10) {
            return alert("Check mobile number")
        }
        else {
            navigate('/landing')
        }
    }
    return (
        <div className="container mt-5" style={{ minWidth: '350px' }}>
            <div className="d-flex justify-content-center">
                <div className="">
                    <div className="card rounded-0" style={{ minWidth: '350px' }}>
                        <div className="card-header rounded-0 text-white bg-primary">
                            <h5 className="card-title mb-0">Login</h5>
                        </div>
                        {msg && <p>{msg}</p>}
                        <div className="card-body">
                            <form>
                                <div className="form-floating mb-3">
                                    <input type="email" className="form-control" id="loginEmail" placeholder="name@example.com" required onChange={e => setLoginData({ ...loginData, email: e.target.value })} />
                                    <label htmlFor="loginEmail">Email address</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input type="password" className="form-control" id="loginPassword" placeholder="Password" required />
                                    <label htmlFor="loginPassword">Password</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="number" className="form-control" id="loginPhone" value={loginData.phone} placeholder="7668490213" required onChange={e => handleLength(e, 10)} />
                                    <label htmlFor="loginPhone">Phone</label>
                                </div>
                                <button type="submit" className="btn rounded-0 btn-primary w-100" onClick={handleSubmit}>Login</button>
                                <b className="my-2 fs-6">Do not have an account? <a href='/register'>Register Here</a></b>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
