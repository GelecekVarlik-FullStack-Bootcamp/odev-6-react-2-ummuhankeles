import axios from 'axios';
import React from 'react';
import { useRef, useState, useEffect } from 'react';
import index from '../../service/authService/index'

const USER_REGEX =  /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PSW_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/auth/register"

function Register() {
    // const userRef = useRef();
    // const errRef = useRef();

    const [username, setUsername] = useState('');
    // const [validName, setValidName] = useState(false);
    // const [userFocus, setUserFocus] = useState(false);

    const [password, setPassword] = useState('');
    // const [validPassword, setValidPassword] = useState(false);
    // const [passwordFocus, setPasswordFocus] = useState(false);

    const [matchPassword, setMatchPassword] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    // const [matchFocus, setMacthFocus] = useState(false);

    const [errMessage, setErrMessage] = useState('');
    const [success, setSuccess] = useState(false);

    // useEffect(() => {
    //     useRef.current.focus();
    // },[])

    useEffect(() => {
        const result = USER_REGEX.test(username);
        console.log(username);
        //setValidName(result);
    }, [username])

    useEffect(() => {
        const result = USER_REGEX.test(password);
        console.log(password);
        //setValidPassword(result);
        const match = password === matchPassword;
        setValidMatch(match); 
    }, [password, matchPassword])

    useEffect(() => {
        setErrMessage('');
    }, [username, password, matchPassword])

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        //debugger;
        const v1 = USER_REGEX.test(username);
        //debugger;
        const v2 = PSW_REGEX.test(password);
        if(v1 || v2) {
            setErrMessage("Invalid Entry");
            return;
        }
        //setSuccess(true)
        
        try {
            const response = await index.post(REGISTER_URL,
                JSON.stringify({username, password}),
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )
            console.log(response.data);
            console.log(response.token);
            console.log(JSON.stringify(response));
            setSuccess(true);
        } catch (error) {
            if(!error?.response) {
                setErrMessage("No Server Response");
            } else if(error.response?.status === 409) {
                setErrMessage("Username Taken");
            } else {
                setErrMessage("Registration Failed");
            }
        }
    }

    return (
        <div className="register-container">
            {
                success ? (
                    <div>
                        <h1>Success</h1>
                        <a href="#">Sign In</a>
                    </div>
                ) : (
                    <div>
                        <h1>Register</h1>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor='username'>Username:</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                    onChange={(e)=>setUsername(e.target.value)}
                                    required
                            />
                            <label htmlFor='password'>Password:</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                                required
                            />
                            <label htmlFor='password'>
                                Confirm Password:
                            </label>
                            <input
                                type="password"
                                id="confirm_password"
                                value={password}
                                onChange={(e)=>setMatchPassword(e.target.value)}
                                required
                            />
                            <button disabled={validMatch ? true : false}>Sign Up</button>
                        </form>
                        <p>
                            <a href="#">Sign In</a>
                        </p>
                    </div>
                )
            }
        </div>
    )
}

export default Register;