import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import Axios from 'axios'

import '../../App.css'

export default function KYCPage() {
  const [payeeusername, setPayeeUsername] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const paymentinfo = () => {
    Axios.post('http://localhost:3001/kycform', {
      payeeusername: payeeusername,
      amount: amount,
      message: message
    }).then((response) => {
      console.log(response);
    })
  }
  
    return (
        <div className="text-center m-5-auto">
            <h2>Payment Page</h2>
            {/* <h5>Update your KYC details</h5> */}
            <form action="/home">
                <p>
                    <label>Payee Username</label><br/>
                    <input 
                        type="text"
                        id="payeeusername"
                        onChange = {(e) => {setPayeeUsername(e.target.value);}}
                    />
                </p>
                <p>
                    <label>Amount</label><br/>
                    <input 
                        type="text"
                        id="amount"
                        onChange = {(e) => {setAmount(e.target.value);}}
                    />
                </p>
                <p>
                    <label>Message</label><br/>
                    <input 
                        type="text"
                        id="message"
                        onChange = {(e) => {setMessage(e.target.value);}} 
                    /> 
                </p>
                {/* <p>
                    <input type="checkbox" name="checkbox" id="checkbox" required /> <span>I agree all information is correct </span>.
                </p> */}
                <p>
                    <button id="sub_btn" type="submit" onClick={paymentinfo}>Pay</button>
                </p>
            </form>
            <footer>
                <p><Link to="/home">Back to Dashboard</Link>.</p>
            </footer>
        </div>
    )
}
