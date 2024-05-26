import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import './studentdetails.css'; // Import the CSS file

function StudentPage() {
    const { id } = useParams();
    const [student, setStudent] = useState(null);
    const [attendance, setAttendance] = useState([]);
    const [editMode, setEditMode] = useState({});
    const [updatedStudent, setUpdatedStudent] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:3000/admin/detailsstudent/${id}`, {
            headers: {
                Authorization: 'Basic YWRtaW46MTIzNA==', // Your authorization token
            },
        })
        .then(response => {
            const data = response.data;
            setStudent(data);
            // Set initial values for updatedStudent
            setUpdatedStudent({
                address: data.address,
                primary: data.primary,
                secondary: data.secondary,
                email: data.email,
            });
        })
        .catch(error => {
            console.error('Error fetching student details:', error);
        });

        // Fetch attendance details
        axios.get(`http://localhost:3000/admin/attendancedetails/${id}`, {
            headers: {
                Authorization: 'Basic YWRtaW46MTIzNA==', // Your authorization token
            },
        })
        .then(response => {
            const data = response.data;
            // Flatten the array of attendance objects and filter by studentId
            const studentAttendance = data.reduce((acc, record) => {
                const attendanceRecords = record.attendance.filter(att => att.studentId === id);
                return [...acc, ...attendanceRecords.map(att => ({
                    date: record.date,
                    status: att.status,
                    studentId: att.studentId,
                    fname: att.fname
                }))];
            }, []);
            setAttendance(studentAttendance);
        })
        .catch(error => {
            console.error('Error fetching attendance details:', error);
        });
    }, [id]);

    const handleEditClick = (field) => {
        setEditMode((prevState) => ({ ...prevState, [field]: true }));
    };

    const handleCancelEdit = () => {
        setEditMode({});
        // Reset updatedStudent to match the original student data
        setUpdatedStudent({
            address: student.address,
            primary: student.primary,
            secondary: student.secondary,
            email: student.email,
        });
    };

    const handleFieldChange = (e) => {
        setUpdatedStudent({ ...updatedStudent, [e.target.name]: e.target.value });
    };

    const handleSaveDetails = () => {
        axios.put(`http://localhost:3000/admin/studentpageedit/${id}`, updatedStudent, {
            headers: {
                Authorization: 'Basic YWRtaW46MTIzNA==' 
            }
        })
        .then(response => {
            console.log('Student details updated successfully');
            setEditMode({});
            setSuccessMessage('Student details updated successfully');
            setStudent(prevStudent => ({ ...prevStudent, ...updatedStudent }));
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000); 
        })
        .catch(error => {
            console.error('Error updating student details:', error);
        });
    };

    if (!student) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Welcome, {student.fname} {student.lname}</h1>
            <p>Class: {student.sclass}</p>
            <p>Section: {student.section}</p>

            {/* Editable fields */}
            <div className="editable-field">
                <p>Email:</p>
                {editMode.email ? (
                    <input
                        className="input-field"
                        type="text"
                        name="email"
                        value={updatedStudent.email}
                        onChange={handleFieldChange}
                    />
                ) : (
                    <span>{student.email}</span>
                )}
                {editMode.email ? (
                    <div className="save-cancel-buttons">
                        <button onClick={handleSaveDetails}>Update</button>
                        <button onClick={handleCancelEdit}>Cancel</button>
                    </div>
                ) : (
                    <FontAwesomeIcon
                        icon={faEdit}
                        className="edit-icon"
                        onClick={() => handleEditClick('email')}
                    />
                )}
            </div>
            <div className="editable-field">
                <p>Father's Phone Number:</p>
                {editMode.primary ? (
                    <input
                        className="input-field"
                        type="text"
                        name="primary"
                        value={updatedStudent.primary}
                        onChange={handleFieldChange}
                    />
                ) : (
                    <span>{student.primary}</span>
                )}
                {editMode.primary ? (
                    <div className="save-cancel-buttons">
                        <button onClick={handleSaveDetails}>Update</button>
                        <button onClick={handleCancelEdit}>Cancel</button>
                    </div>
                ) : (
                    <FontAwesomeIcon
                        icon={faEdit}
                        className="edit-icon"
                        onClick={() => handleEditClick('primary')}
                    />
                )}
            </div>
            <div className="editable-field">
                <p>Mother's Phone Number:</p>
                {editMode.secondary ? (
                    <input
                        className="input-field"
                        type="text"
                        name="secondary"
                        value={updatedStudent.secondary}
                        onChange={handleFieldChange}
                    />
                ) : (
                    <span>{student.secondary}</span>
                )}
                {editMode.secondary ? (
                    <div className="save-cancel-buttons">
                        <button onClick={handleSaveDetails}>Update</button>
                        <button onClick={handleCancelEdit}>Cancel</button>
                    </div>
                ) : (
                    <FontAwesomeIcon
                        icon={faEdit}
                        className="edit-icon"
                        onClick={() => handleEditClick('secondary')}
                    />
                )}
            </div>
            <div className="editable-field">
                <p>Address:</p>
                {editMode.address ? (
                    <input
                        className="input-field"
                        type="text"
                        name="address"
                        value={updatedStudent.address}
                        onChange={handleFieldChange}
                    />
                ) : (
                    <span>{student.address}</span>
                )}
                {editMode.address ? (
                    <div className="save-cancel-buttons">
                        <button onClick={handleSaveDetails}>Update</button>
                        <button onClick={handleCancelEdit}>Cancel</button>
                    </div>
                ) : (
                    <FontAwesomeIcon
                        icon={faEdit}
                        className="edit-icon"
                        onClick={() => handleEditClick('address')}
                    />
                )}
            </div>

            <h2>Attendance Details:</h2>
            {attendance.length > 0 ? (
                <ul>
                    {attendance.map((record, index) => (
                        <li key={index}>
                            Date: {new Date(record.date).toLocaleDateString()}, Student ID: {record.studentId}, Status: {record.status}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No attendance records found.</p>
            )}

            {successMessage && <div className="success-message">{successMessage}</div>}
        </div>
    );
}

export default StudentPage;
