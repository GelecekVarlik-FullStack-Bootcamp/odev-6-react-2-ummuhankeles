import React from 'react'
import { useState } from 'react'
//import { Auth } from '../../services/http/auth'
import Categories from '../Categories/Categories'
import Todos from '../Todos/Todos'
import PropTypes from 'prop-types';

function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [success, setSuccess] = useState(false)
    const [tab, setTab] = useState('todo')

    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log(username, password)
        try{
            let item = {username, password}
            let result = await fetch('http://localhost:81/auth/login', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(item)
            })
            result = await result.json()
            console.log(result)
            setUsername('')
            setPassword('')
            setSuccess(true)
        } catch(ex) {
            console.log(ex.message)
        }
    }

    return ( 
        <div className="login-container">
            {
                success ? (
                    <div className='buttons'>
                        <button className='todos-button' onClick={()=>setTab('todo')}>Todos</button>
                        <button className='categories-button' onClick={()=>setTab('category')}>Categories</button>
                        {tab === 'todo' ? <Todos/> : <Categories/>}
                    </div>
                ) : (
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
                        <button>Login</button>
                    </form>
                )
            }
        </div>
    );
}

export default Login;

Login.propTypes = {
    setToken: PropTypes.func.isRequired
};