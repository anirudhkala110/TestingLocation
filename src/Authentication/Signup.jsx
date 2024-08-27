import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


function SignUp() {
    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-center">
                <div className="">
                    <div className="card bg-light rounded-0" style={{ minWidth: '350px' }}>
                        <div className="card-header rounded-0 text-white bg-primary">
                            <b className="card-title mb-0">Sign Up</b>
                        </div>
                        <div className="card-body">
                            <form >
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="signupName" placeholder="John Doe" required />
                                    <label htmlFor="signupName">Full Name</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input type="email" className="form-control" id="signupEmail" placeholder="name@example.com" required />
                                    <label htmlFor="signupEmail">Email address</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input type="password" className="form-control" id="signupPassword" placeholder="Password" required />
                                    <label htmlFor="signupPassword">Password</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="number" className="form-control" id="phone" placeholder="Phone Bumber" required />
                                    <label htmlFor="phone">Phone Number</label>
                                </div>
                            </form>
                            <button type="submit" className="btn rounded-0 btn-primary w-100">Sign Up</button>
                            <sm>Already have an account ? <a href='/login'>Login Here !</a></sm>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
