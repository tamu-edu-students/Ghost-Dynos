import React from 'react'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import Axios from 'axios'

import '../../App.css'

export default function SignInPage() {

    // UseStates for Login
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const login = () => {
        Axios.post('http://localhost:3001/login', {
        username: username,
        password: password,
        }).then((response) => {

        if (response.data.message) { // failed authentication
            console.log("failed authentication");
        } else { // successful authentication
            window.location.replace("http://localhost:3000/home");
            console.log(" localhost:3000/home " + window.location.href);
        }
        })

    }

    return (
    <div className="text-center m-5-auto">
        <h2>Sign in to us</h2>
        <form>
            <p>
                <label>Username</label><br/>
                <input 
                    type="text"
                    placeholder="Username..."
                    onChange = {(e) => {setUsername(e.target.value)}}
                /> 
            </p>
            <p>
                <label>Password</label>
                <Link to="/forget-password"><label className="right-label">Forget password?</label></Link>
                <br/>
                <input 
                    type="password" 
                    placeholder="Password..."
                    onChange = {(e) => {setPassword(e.target.value)}}
                />
            </p>
            <p>
                <button id="sub_btn" type="submit" onClick = {login}>Login</button>
            </p>
        </form>

        <footer>
            <p>First time? <Link to="/register">Create an account</Link>.</p>
            <p><Link to="/">Back to Homepage</Link>.</p>
        </footer>
    </div>
    )
}
