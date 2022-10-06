import './App.css';
import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import Axios from 'axios'

function App() {
  const [user, setUser] = useState({});

  // UseStates for Registration
  const [usernameReg, setUsernameReg] = useState('');
  const [emailReg, setEmailReg] = useState('');
  const [passwordReg, setPasswordReg] = useState('');

  // UseStates for Login
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState("");

  const register = () => {
    Axios.post('http://localhost:3001/register', {
      username: usernameReg,
      email: emailReg, 
      password: passwordReg
    }).then((response) => {
      console.log(response);
    })
  }

  const login = () => {
    Axios.post('http://localhost:3001/login', {
      username: username,
      password: password,
    }).then((response) => {

      if (response.data.message) {
        setLoginStatus(response.data.message)
      } else {
        signIn(response.data.rows[0]);
      }
    })

  }

  // Sign in Function
  const signIn = (user) => {
      if (user.username) {
        setLoginStatus("Welcome, " + user.username);
      } else {
        setLoginStatus("Welcome, " + user.name)
      }
    setUser(user);
    document.getElementById("signInDiv").hidden = true;
    document.getElementById("registration").hidden = true;
    document.getElementById("login").hidden = true;
  }

  // prompt again
  function signOut(event) {
    setUser({});
    setLoginStatus("");
    document.getElementById("signInDiv").hidden = false;
    document.getElementById("registration").hidden = false;
    document.getElementById("login").hidden = false;
  }
  
  // Google stuff
  function handleCallbackResponse(response) {
    // console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
    signIn(userObject);
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

  return (

    // Username and Password Boxes
    <div className="App">


      <div id="registration">
        <h1>Registration</h1>
        <label>Email </label> <br></br>
        <input 
          type="text"
          id="emailReg"
          onChange = {(e) => {            // This gets the text in the box
            setEmailReg(e.target.value);
          }} 
        /> <br></br>
        <label>Username </label> <br></br>
        <input 
          type="text"
          id="usernameReg"
          onChange = {(e) => {
            setUsernameReg(e.target.value);
          }}
        /> <br></br>
        <label>Password </label> <br></br>
        <input 
          type="password"
          id="passwordReg"
          onChange = {(e) => {
            setPasswordReg(e.target.value);
          }}
        /> <br></br>
        <button onClick={register}> Register </button>
      </div>


      <div id="login">
        <h1>Login</h1>
        <input 
          type="text"
          placeholder="Username..."
          onChange = {(e) => {
            setUsername(e.target.value)
          }}
        /> <br></br>
        <input 
          type="password" 
          placeholder="Password..."
          onChange = {(e) => {
            setPassword(e.target.value)
          }}
        /> <br></br>
        <button onClick = {login}> Login </button>
      </div>

      <h1>{loginStatus}</h1>
      <div id="signInDiv"></div>
      { user &&
        <div>
          <img src={user.picture}></img>
        </div>
      }
      {Object.keys(user).length != 0 &&
        <button onClick= { (e) => signOut(e)}>Sign Out</button>
      }


    </div>
  );
}

export default App;
