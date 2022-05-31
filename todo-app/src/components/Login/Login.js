import React from 'react';
import { useState } from 'react';
import index from '../../service/authService/index'
import { useNavigate } from 'react-router-dom';
import '../Login/Login.css'

const LOGIN_URL = '/auth/login'

function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    //const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log(username, password);
        try {
            const response = await index.post(LOGIN_URL,
                JSON.stringify({username, password}),
                {
                    headers: {
                        'Content-Type': 'application/json'},
                    withCredentials: true
                    
                }
            )
            JSON.stringify(localStorage.setItem('user', response?.data.token))
            //console.log(JSON.stringify(response?.data));
            //const token = response?.data?.token;
            //const roles = response?.data?.roles;
            setUsername('');
            setPassword('')
            navigate('todos');
        } catch (error) {
            if(!error?.response) {
                alert('No Server Response');
            } else if(error.response?.status === 400) {
                alert('Missing Username Or Password');
            } else if(error.response?.status === 401) {
                alert('Unauthorized')
            } else {
                alert('Login Failed')
            }
        }
    }

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-box">
                    <label htmlFor='username'>Username:</label>
                    <br/>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e)=>setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="input-box">
                    <label htmlFor='password'>Password:</label>
                    <br/>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="login-btn">
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login;