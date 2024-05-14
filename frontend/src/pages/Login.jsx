import React, { useState } from 'react';
import { login } from '../apiClient';

const LoginPage = ({ setToken }) => {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [invalidCredentials, setAreCredentialsInvalid] = useState(false);
    const [serverError, setIsServerError] = useState(false);
    const [submitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e) => {
        setIsSubmitting(true);
        e.preventDefault();
        login({
          username,
          password
        }).then((data) => {
            console.log(data);
            if (data.status === "succeed") {
                setToken(data.token);
            }
            else {
                setAreCredentialsInvalid(true);
            }
            setIsSubmitting(false);
        }).catch((err) => {
            console.log(`An error occured ${err}`);
            setIsServerError(false);
            setIsSubmitting(false);
        })
        
      }
    return (
        <div className="flex object-center flex-col items-center h-screen">
            <h1>Please Log In</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Username</p>
                    <input type="text" onChange={e => setUserName(e.target.value)}/>
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={e => setPassword(e.target.value)}/>
                </label>
                <div>
                    <button className={`btn ${submitting ? 'disabled' : ''}`} disabled={submitting} type="submit">Submit</button>
                </div>
                <div className={`${invalidCredentials ? "visible" : "invisible"} text-red-600`}>
                    Either your username or password is invalid.
                </div>
                <div className={`${serverError ? "visible" : "invisible"} text-red-600`}>
                    An error occured on the server. Please retry later...
                </div>
            </form>
        </div>
    )
}

export default LoginPage