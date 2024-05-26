import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './adminlogin.css';

function Adminlogin() {
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        
        axios.post('http://localhost:3000/admin/adminlogin', { name, password }, { 
            headers: {
                Authorization: 'Basic YWRtaW46MTIzNA=='
            }
        })
        .then((res) => {
            console.log(res);
            if (res.data === 'login sucessfully') {
                setName('');
                setPassword('');
                setError('');
                navigate(`/admin/${name}`);
            } else {
                setError('Incorrect password or user not found');
            }
        })
        .catch((error) => {
            console.error('Login error:', error);
            setError('Failed to login. Please try again later.');
        });
    };

    return (
        <div className="login-container">
            <h1>Admin Login</h1>
            {error && <p>{error}</p>}
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="name">User ID:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password" 
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
} 

export default Adminlogin;
