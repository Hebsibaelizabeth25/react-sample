import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './teacherLogin.css';

function TeacherLogin() {
    const [dob, setDob] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        
        axios.post('http://localhost:3000/admin/teacherlogin', { email, dob }, { 
            headers: {
                Authorization: 'Basic YWRtaW46MTIzNA=='
            }
        })
        .then((res) => {
            console.log(res);
            setEmail('');
            setDob('');
            setError('');
            navigate(`/teacher/${email}`, { state: { teacherId: res.data.teacherId } }); 
        })
        .catch((error) => {
            console.error('Login error:', error);
            setError('Failed to login. Please try again later.');
        });
    };

    return (
        <div className="login-container">
            <h1>Teacher Login</h1>
            {error && <p>{error}</p>}
            <form onSubmit={handleLogin}>
                <div>
                    <h4 htmlFor="name">Email ID:</h4>
                    <input
                        type="text"
                        id="name"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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

export default TeacherLogin;
