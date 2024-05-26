import React, { useState } from "react";
import axios from 'axios';
import './leaverequest.css';

function LeaveRequestPage() {
    const [leaveRequest, setLeaveRequest] = useState({
        teacherId: '',
        name: '',
        email: '',
        dateform: '',
        dateto: '',
        comments: '',
        type: ''
    });

    const [errors, setErrors] = useState({
        teacherId: '',
        name: '',
        email:'',
        dateform: '',
        dateto: '',
        type: ''
    });

    const handleLeaveRequestChange = (e) => {
        const { name, value } = e.target;
        setLeaveRequest(prevState => ({
            ...prevState,
            [name]: value
        }));
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: ''
        }));
    };

    const handleLeaveRequestSubmit = (e) => {
        e.preventDefault();
        const { teacherId, name, email, dateform, dateto, type } = leaveRequest; // Ensure email is extracted from leaveRequest

        // Check if any required field is empty
        const newErrors = {};
        if (!teacherId) newErrors.teacherId = 'Teacher ID is required.';
        if (!name) newErrors.name = 'Name is required.';
        if (!email) newErrors.email = 'Email is required.'; // Update the error message
        if (!dateform) newErrors.dateform = 'Date From is required.';
        if (!dateto) newErrors.dateto = 'Date To is required.';
        if (!type) newErrors.type = 'Type is required.';
        
        // If any errors, update state and prevent form submission
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        axios.post('http://localhost:3000/admin/leaveform', leaveRequest, {
            headers: {
                Authorization: 'Basic YWRtaW46MTIzNA=='
            }
        })
        .then(response => {
            console.log('Leave request submitted:', leaveRequest);
            setLeaveRequest({
                teacherId: '',
                name: '',
                email: '', 
                dateform: '',
                dateto: '',
                comments: '',
                type: ''
            });
            alert("Leave request submitted successfully!");
        })
        .catch(error => {
            console.error('Error submitting leave request:', error);
            alert("Error submitting leave request. Please try again later.");
        });
    };

    return (
        <div className="leave-request-page">
            <h2>Leave Request</h2>
            <form className="leave-request-form" onSubmit={handleLeaveRequestSubmit}>
                <div className="form-group">
                    <label>Teacher ID*:</label>
                    <input type="text" name="teacherId" value={leaveRequest.teacherId} onChange={handleLeaveRequestChange} />
                    <div className="error">{errors.teacherId}</div>
                </div>
                <div className="form-group">
                    <label>Email id*:</label>
                    <input type="text" name="email" value={leaveRequest.email} onChange={handleLeaveRequestChange} />
                    <div className="error">{errors.email}</div>
                </div>
                <div className="form-group">
                    <label>Name*:</label>
                    <input type="text" name="name" value={leaveRequest.name} onChange={handleLeaveRequestChange} />
                    <div className="error">{errors.name}</div>
                </div>
                <div className="form-group">
                    <label>Date From*:</label>
                    <input type="date" name="dateform" value={leaveRequest.dateform} onChange={handleLeaveRequestChange} />
                    <div className="error">{errors.dateform}</div>
                </div>
                <div className="form-group">
                    <label>Date To*:</label>
                    <input type="date" name="dateto" value={leaveRequest.dateto} onChange={handleLeaveRequestChange} />
                    <div className="error">{errors.dateto}</div>
                </div>
                <div className="form-group">
                    <label>Comments:</label>
                    <textarea name="comments" value={leaveRequest.comments} onChange={handleLeaveRequestChange}></textarea>
                </div>
                <div className="form-group">
                    <label>Type*:</label>
                    <select name="type" value={leaveRequest.type} onChange={handleLeaveRequestChange}>
                        <option value="">Select Type</option>
                        <option value="Sick Leave">Sick Leave</option>
                        <option value="Vacation">Vacation</option>
                        <option value="Personal Leave">Personal Leave</option>
                    </select>
                    <div className="error">{errors.type}</div>
                </div>
                <button type="submit">Send Request</button>
            </form>
        </div>
    );
}

export default LeaveRequestPage;
