// Initialize express server
const express = require("express");
const Pool = (require("pg")).Pool
const cors = require("cors");
require('dotenv').config()
const path = require("path");


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
// app.use(express.static(path.join(__dirname, "client/build")))

if (process.env.NODE_ENV === "production") {
    //serve static content
    // use npm run build
    app.use(express.static(path.join(__dirname, "client/build")))
}

// Prints when running server
app.listen(process.env.PORT | PORT, () => {
  console.log(`running server on port ${PORT}`)
})
/*const pool = new Pool({
    user: 'my_user',
    host: 'localhost',
    database: 'login',
    password: 'root',
    port: 5432,
}); */

const devConfig = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

const proConfig = process.env.DATABASE_URL //heroku addons
const pool = new Pool({
    connectionString: process.env.NODE_ENV === "production" ? proConfig : devConfig,

    // comment out when in localhost
    ssl: {
        rejectUnauthorized: false
      } 
})
// Function to register the user
app.post('/register', (req, res) => {

    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    pool.query("INSERT INTO info (username, email, password) VALUES ($1, $2, $3)",
    [username, email, password],
    (err, result) => {
        console.log(`error is ${err}`)
        console.log(`result is ${result}`)
      }
    );
})

// Function to authenticate user
app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log(`username is ${username}`)
    console.log(`password is ${password}`)
    
    pool.query(
        
        "SELECT * FROM info WHERE username = $1 AND password = $2",
        [username, password],
        (err, result) => {
            console.log(`error is ${err}`)
            console.log(`result is ${result}`)
            if (err) {
                res.send({err: err}); //if error, next wont run
            }
            // If we have found someone with that username/pass combo
            if (result.rows.length > 0) {
                res.send(result)
            }
            else {
                res.send({message: "Invalid Credentials."})
            }
        }
    )
})

app.post('/kycform', (req, res) => {

    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const driverid = req.body.driverid
    const state = req.body.state
    const zip = req.body.zip 
    const birthdate = req.body.birthdate
    pool.query("INSERT INTO kycform (firstname, lastname, driverid, state, zip, birthdate) VALUES ($1, $2, $3, $4, $5, $6)",
    [firstname, lastname, driverid, state, zip, birthdate],
    (err, result) => {
        console.log(`error is ${err}`)
        console.log(`result is ${result}`)
      }
    );
})
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"))
})
