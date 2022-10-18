import React from 'react'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import Axios from 'axios'
import jwt_decode from 'jwt-decode';


import '../../App.css'

export default function SignInPage() {

    // UseStates for Login
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState({});


    function handleCallbackResponse(response) {
        console.log("Encoded JWT ID token: " + response.credential);
        var userObject = jwt_decode(response.credential);
        console.log(userObject);
        console.log(window.location.href);
        window.location.replace("/home");
        setUser(userObject);
        document.getElementById("signInDiv").hidden = false;
      }

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
          client_id: "787802789658-som6i2h91g2t708bhkg5m3aen4tb1rpa.apps.googleusercontent.com",
          callback: handleCallbackResponse
        })
    
        google.accounts.id.renderButton(
          document.getElementById("signInDiv"),
          { theme:"outline", size: "large" }
        )
    }, []);

    const login = () => {
        Axios.post('http://localhost:3001/login', {
        username: username,
        password: password,
        }).then((response) => {
            console.log(response)
        if (response.data.message) { // failed authentication
            console.log("failed authentication");
            document.getElementById("loginStatus").innerHTML = "Invalid Credentials";
        } else { // successful authentication
            document.getElementById("loginStatus").innerHTML = "";
            window.location.assign("/home");
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
            <label id="loginStatus"></label>
            <div id="signInDiv"></div>
        </form>

        <footer>
            <p>First time? <Link to="/register">Create an account</Link>.</p>
            <p><Link to="/">Back to Homepage</Link>.</p>
        </footer>
    </div>
    )
}
