import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import './teacherLogin.css'
import axios from 'axios'; // Import axios for HTTP requests

function Tlogin() {
    const [userId, setUserUpdateId] = useState('');
    const [password, setPasswordUpdate] = useState('');
    const [userIdError, setUserIdError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loginError, setLoginError] = useState('');
    const [teachersData, setTeachersData] = useState([]);
    const navigate=useNavigate()

    useEffect(() => {
        // Fetch teachers data when the component mounts
        axios.get('http://localhost:3000/teachers')
            .then(response => {
                setTeachersData(response.data);
            })
            .catch(error => {
                console.error('Error fetching teachers data:', error);
            });
    }, []);

    const proceedLogin = (e) => {
        e.preventDefault();
        // Call validation function before proceeding with login
        if (validation()) {
            // Proceed with login logic
            const user = teachersData.find(user => user.id === userId);
            if (user) {
                if (user["D.O.B"] === password) {
                    // Clear login error if login is successful
                    setLoginError('');
                    // Login successful
                    console.log("Login successful");
                    navigate('/')
                    // Redirect or perform further actions
                } else {
                    setLoginError('Invalid password.');
                }
            } else {
                setLoginError('User not found.');
            }
        }
    }

    // Perform validation before proceeding
    const validation = () => {
        let isValid = true;

        // Validate User Id
        if (!userId || userId.trim() === '') {
            setUserIdError('ID is required');
            isValid = false;
        } else {
            setUserIdError('');
        }

        // Validate Password
        if (!password || password.trim() === '') {
            setPasswordError('Password is required');
            isValid = false;
        } else {
            setPasswordError('');
        }

        return isValid;
    }

    return (
        <div className="login-container">
            <form onSubmit={proceedLogin} className="login-form">
                <h1>Login</h1>
                <div className="form-group">
                    <label className="userId">Teacher ID</label>
                    <input
                        type="text"
                        id="userId"
                        className="form-control"
                        value={userId}
                        onChange={(e) => setUserUpdateId(e.target.value)}
                    />
                    {userIdError && <p className="error-message">{userIdError}</p>}
                </div>
                <div className="form-group">
                    <label className="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        placeholder="Enter your DOB here"
                        value={password}
                        onChange={(e) => setPasswordUpdate(e.target.value)}
                    />
                    {passwordError && <p className="error-message">{passwordError}</p>}
                </div>
                {loginError && <p className="error-message">{loginError}</p>}
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Login</button>
                </div>
                
            </form>
        </div>
    );
}

export default Tlogin;
