import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';

function App() {
  const [user, setUser] = useState({});

  
  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  }

  // prompt again
  function handleSignOut(event) {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
    google.accounts.id.prompt()
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

    google.accounts.id.prompt()
  }, []);

  // If no user, show sign in, if signed in, show log out
  return (

    // Username and Password Boxes
    <div className="App">
      <div className="registration">
        <h1>Registration</h1>
        <label>Username</label>
        <input type="text" />
        <br></br>
        <label>Password</label>
        <input type="text" />
      </div>
      <div className="login">
        <h1>Login</h1>
        <input type="text" placeholder="Username..." /> <br></br>
        <input type="password" placeholder="Password..."/> <br></br>
        <button> Login </button>
      </div>
      <div id="signInDiv"></div>
      {Object.keys(user).length != 0 &&
        <button onClick= { (e) => handleSignOut(e)}>Sign Out</button>
      }

      { user &&
      <div>
        <img src={user.picture}></img>
        <h3>{user.name}</h3>
      </div>
    }
    </div>
  );
}

export default App;
