import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './studentlogin.css';

function StudentLogin() {
    const [dob, setDob] = useState('');
    const [_id, setId] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        
        axios.post('http://localhost:3000/admin/studentlogin', { _id, dob }, { 
            headers: {
                Authorization: 'Basic YWRtaW46MTIzNA=='
            }
        })
        .then((res) => {
            console.log(res);
            setId('');
            setDob('');
            setError('');
            navigate(`/student/${_id}`, { state: { _id: res.data._id } });
        })
        .catch((error) => {
            console.error('Login error:', error);
            setError('Failed to login. Please try again later.');
        });
    };

    return (
        <div className="login-container">
            <h1>Student Login</h1>
            {error && <p>{error}</p>}
            <form onSubmit={handleLogin}>
                <div>
                    <h4 htmlFor="name">Student ID:</h4>
                    <input
                        type="text"
                        id="name"
                        value={_id}
                        onChange={(e) => setId(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <h4 htmlFor="password">Date of Birth (YYYY-MM-DD):</h4>
                    <input
                        type="text"
                        id="password"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        placeholder="YYYY-MM-DD"
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
} 

export default StudentLogin;
