import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import './lgteacherdetails.css'; // Import your CSS file

function TeacherLgPage() {
    const { email } = useParams();
    const [teacher, setTeacher] = useState(null);
    const [timetable, setTimetable] = useState([]);
    const [todaySchedule, setTodaySchedule] = useState(null);
    const [students, setStudents] = useState([]);
    const [attendance, setAttendance] = useState({});
    const [editMode, setEditMode] = useState({});
    const [leaveDetails, setLeaveDetails] = useState(null); // State for leave details
    const [successMessage, setSuccessMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false); // State for showing popup

    useEffect(() => {
        axios.get(`http://localhost:3000/admin/teachers/${email}`, {
            headers: {
                Authorization: 'Basic YWRtaW46MTIzNA==' // Your authorization token
            }
        })
        .then(response => {
            const data = response.data;
            setTeacher(data);
            const parsedTimetable = JSON.parse(data.timetable);
            setTimetable(parsedTimetable);

            axios.get('http://localhost:3000/admin/studentdetails', {
                params: {
                    sclass: data.sclass,
                    section: data.section,
                },
                headers: {
                    Authorization: 'Basic YWRtaW46MTIzNA==' // Your authorization token
                }
            })
            .then(response2 => {
                if (Array.isArray(response2.data)) {
                    setStudents(response2.data);
                    setAttendance(response2.data.reduce((acc, student) => {
                        acc[student._id] = null; // Initial state is neither present nor absent
                        return acc;
                    }, {}));
                } else {
                    console.error("Expected an array but got:", response2.data);
                }
            })
            .catch(error => {
                console.error('Error fetching students:', error);
            });
        })
        .catch(error => {
            console.error('Error fetching teacher details:', error);
        });

        // Fetch leave details
        axios.get(`http://localhost:3000/admin/leavedetails/${email}`, {
            headers: {
                Authorization: 'Basic YWRtaW46MTIzNA==' // Your authorization token
            }
        })
        .then(response => {
            setLeaveDetails(response.data);
        })
        .catch(error => {
            console.error('Error fetching leave details:', error);
        });

    }, [email]);

    useEffect(() => {
        if (Array.isArray(timetable) && timetable.length > 0) {
            const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
            const schedule = timetable.find(day => day.day === today);
            setTodaySchedule(schedule);
        }
    }, [timetable]);

    const handleCheckboxChange = (studentId, status) => {
        setAttendance(prevState => ({
            ...prevState,
            [studentId]: status,
        }));
    };

    const handleEditClick = (field) => {
        setEditMode((prevState) => ({ ...prevState, [field]: !prevState[field] }));
    };

    const handleFieldChange = (e) => {
        setTeacher({ ...teacher, [e.target.name]: e.target.value });
    };

    const handleSaveDetails = () => {
        axios.put(`http://localhost:3000/admin/teacherpageedit/${email}`, teacher, {
            headers: {
                Authorization: 'Basic YWRtaW46MTIzNA==' // Your authorization token
            }
        })
        .then(response => {
            console.log('Teacher details updated successfully');
            setEditMode({});
            setSuccessMessage('Teacher details updated successfully');
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000); // Hide the message after 3 seconds
        })
        .catch(error => {
            console.error('Error updating teacher details:', error);
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const attendanceData = {
            date: new Date().toISOString(),
            sclass: teacher.sclass,
            section: teacher.section,
            students: students.map(student => ({
                studentId: student._id,
                fname: student.fname,
                present: attendance[student._id] === 'present',
            })),
        };
        axios.post('http://localhost:3000/admin/attendance', attendanceData, {
            headers: {
                Authorization: 'Basic YWRtaW46MTIzNA==' // Your authorization token
            }
        })
        .then(response => {
            setShowPopup(true); // Show popup after saving attendance
            // Reset attendance state
            setAttendance(students.reduce((acc, student) => {
                acc[student._id] = null;
                return acc;
            }, {}));
        })
        .catch(error => {
            console.error('Error saving attendance:', error);
        });
    };

    const handleCancelEdit = () => {
        setEditMode({});
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    if (!teacher) {
        return <div>Loading...</div>;
    }

    return (
        <div className="teacher-lg-page">
            <button className="leave-button top-right-corner">
                <Link to="/leave-request">Leave Request</Link>
            </button>
            <div>
                <h2>Hello {teacher.fname} {teacher.lname}</h2>
                <div>
                    <p>ID: {teacher._id}</p>
                    <p>First Name: {teacher.fname}</p>
                    <p>Last Name: {teacher.lname}</p>
                    <p>Gender: {teacher.gender}</p>
                    <div className="editable-field">
                        <p>Email:</p>
                        {editMode.email ? (
                            <input
                                className="input-field"
                                type="text"
                                name="email"
                                value={teacher.email}
                                onChange={handleFieldChange}
                            />
                        ) : (
                            <span>{teacher.email}</span>
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
                        <p>Address:</p>
                        {editMode.address ? (
                            <input
                                className="input-field"
                                type="text"
                                name="address"
                                value={teacher.address}
                                onChange={handleFieldChange}
                            />
                        ) : (
                            <span>{teacher.address}</span>
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
                    <div className="editable-field">
                        <p>Primary Phone Number:</p>
                        {editMode.primary ? (
                            <input
                                className="input-field"
                                type="text"
                                name="primary"
                                value={teacher.primary}
                                onChange={handleFieldChange}
                            />
                        ) : (
                            <span>{teacher.primary}</span>
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
                        <p>Secondary Phone Number:</p>
                        {editMode.secondary ? (
                            <input
                                className="input-field"
                                type="text"
                                name="secondary"
                                value={teacher.secondary}
                                onChange={handleFieldChange}
                            />
                        ) : (
                            <span>{teacher.secondary}</span>
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
                    {successMessage && <div className="success-message">{successMessage}</div>}
                </div>
            </div>

            <div className="today-schedule">
                <h3>Today's Schedule ({todaySchedule ? todaySchedule.day : 'No schedule available'})</h3>
                {todaySchedule ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Time</th>
                                <th>Subject</th>
                            </tr>
                        </thead>
                        <tbody>
                            {todaySchedule.periods.map(period => (
                                <tr key={period.time}>
                                    <td>{period.time}</td>
                                    <td>{period.subject}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No schedule available for today</p>
                )}
            </div>
            <div className="attendance-section">
                <h3>Mark Attendance</h3>
                <form onSubmit={handleSubmit}>
                    {Array.isArray(students) && students.length > 0 ? (
                        students.map(student => (
                            <div key={student._id}>
                                <label>
                                    {student.fname} (ID: {student._id})
                                    <input
                                        type="checkbox"
                                        checked={attendance[student._id] === 'present'}
                                        onChange={() => handleCheckboxChange(student._id, 'present')}
                                    /> Present
                                    <input
                                        type="checkbox"
                                        checked={attendance[student._id] === 'absent'}
                                        onChange={() => handleCheckboxChange(student._id, 'absent')}
                                    /> Absent
                                </label>
                            </div>
                        ))
                    ) : (
                        <p>No students found</p>
                    )}
                    <button type="submit">Save Attendance</button>
                </form>
            </div>
            <div className="leave-details">
                <h3>Leave Request Status</h3>
                {leaveDetails ? (
                    <div>
                        <p>Status: {leaveDetails.status}</p>
                    </div>
                ) : (
                    <p>No leave request found</p>
                )}
            </div>

            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <p>Attendance saved successfully!</p>
                        <button onClick={handleClosePopup}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TeacherLgPage;
