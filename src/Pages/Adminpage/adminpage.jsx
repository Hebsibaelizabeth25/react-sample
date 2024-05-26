import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useNavigate, useParams } from "react-router-dom";
import './adminpage.css'; 

function AdminDashboard() {
    const { name } = useParams();
    const [adminname, setAdminName] = useState(null);
    const [leaveDetails, setLeaveDetails] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAdmin();
        fetchTeachers();
        fetchStudents();
        fetchLeaveDetails();
    }, []);

    const fetchLeaveDetails = () => {
        axios.get('http://localhost:3000/admin/leavedetails', {
            headers: {
                Authorization: 'Basic YWRtaW46MTIzNA=='
            }
        })
        .then(response => {
            setLeaveDetails(response.data);
        })
        .catch(error => {
            console.error('Error fetching leave details:', error);
        });
    }

    const fetchAdmin = () => {
        axios.get(`http://localhost:3000/admin/admindetails/${name}`, {
            headers: {
                Authorization: 'Basic YWRtaW46MTIzNA=='
            }
        })
        .then(response => {
            setAdminName(response.data);
        })
        .catch(error => {
            console.error('Error fetching admin details:', error);
        });
    }

    const fetchTeachers = () => {
        axios.get('http://localhost:3000/admin/teachers', {
            headers: {
                Authorization: 'Basic YWRtaW46MTIzNA=='
            }
        })
        .then(response => {
            setTeachers(response.data);
        })
        .catch(error => {
            console.error('Error fetching teachers data:', error);
        });
    }

    const fetchStudents = () => {
        axios.get('http://localhost:3000/admin/studentdetail', {
            headers: {
                Authorization: 'Basic YWRtaW46MTIzNA=='
            }
        })
        .then(response => {
            setStudents(response.data);
        })
        .catch(error => {
            console.error('Error fetching students data:', error);
        });
    }

    const handleViewTeacher = (teacherId) => {
        navigate(`/teachers/${teacherId}`);
    }

    const handleEditTeacher = (teacherId) => {
        navigate(`/teacheredit/${teacherId}`);
    };

    const handleDeleteTeacher = (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this teacher?");
        if (confirmed) {
            axios.delete(`http://localhost:3000/admin/teachers/${id}`, {
                headers: {
                    Authorization: 'Basic YWRtaW46MTIzNA=='
                }
            })
            .then(response => {
                console.log('Teacher deleted successfully');
                fetchTeachers(); 
            })
            .catch(error => {
                console.error('Error deleting teacher:', error);
            });
        }
    }

    const handleViewStudent = (studentId) => {
        navigate(`/detailsstudent/${studentId}`);
    }

    const handleEditStudent = (studentId) => {
        navigate(`/student-edit/${studentId}`);
    };

    const handleDeleteStudent = (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this student?");
        if (confirmed) {
            axios.delete(`http://localhost:3000/admin/studentd/${id}`, {
                headers: {
                    Authorization: 'Basic YWRtaW46MTIzNA=='
                }
            })
            .then(response => {
                console.log('Student deleted successfully');
                fetchStudents();
            })
            .catch(error => {
                console.error('Error deleting student:', error);
            });
        }
    }

    const handleReject = (teacherId) => {
        const adminName = adminname.name;
    
        axios.put(`http://localhost:3000/admin/leavedetails/rejected/${teacherId}`, { adminName }, {
            headers: {
                Authorization: 'Basic YWRtaW46MTIzNA=='
            }
        })
        .then(response => {
            console.log('Leave request rejected successfully');
            setLeaveDetails(leaveDetails.filter(request => request.teacherId !== teacherId));
        })
        .catch(error => {
            console.error('Error rejecting leave request:', error);
        });
    };
    
    const handleApprove = (teacherId) => {
        const adminName = adminname.name;
    
        axios.put(`http://localhost:3000/admin/leavedetails/approved/${teacherId}`, { adminName }, {
            headers: {
                Authorization: 'Basic YWRtaW46MTIzNA=='
            }
        })
        .then(response => {
            console.log('Leave request approved successfully');
            setLeaveDetails(leaveDetails.filter(request => request.teacherId !== teacherId));
        })
        .catch(error => {
            console.error('Error approving leave request:', error);
        });
    };
    return (
        <div className="admin-container">
            <div className="welcome-section">
                <h3>Welcome {adminname ? adminname.name : 'Loading...'}</h3>
                <div>
                    <Link to="/add-student">
                        <button className="button">Add Student</button>
                    </Link>
                    <Link to="/add-teacher">
                        <button className="button">Add Teacher</button>
                    </Link>
                </div>
            </div>

            <h3>Teacher Details</h3>
            <table className="datatable">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {teachers.map(teacher => (
                        <tr key={teacher._id}>
                            <td>{teacher._id}</td>
                            <td>{teacher.fname}</td>
                            <td>{teacher.lname}</td>
                            <td>
                                <button onClick={() => handleViewTeacher(teacher._id)}>View</button>
                                <button onClick={() => handleEditTeacher(teacher._id)}>Edit</button>
                                <button onClick={() => handleDeleteTeacher(teacher._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h3>Student Details</h3>
            <table className="datatable">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <tr key={student._id}>
                            <td>{student._id}</td>
                            <td>{student.fname}</td>
                            <td>{student.lname}</td>
                            <td>
                                <button onClick={() => handleViewStudent(student._id)}>View</button>
                                <button onClick={() => handleEditStudent(student._id)}>Edit</button>
                                <button onClick={() => handleDeleteStudent(student._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h3>Leave Request Details</h3>
            <table className="datatable leave-details">
                <thead>
                    <tr>
                        <th>Teacher ID</th>
                        <th>Name</th>
                        <th>Leave Type</th>
                        <th>Date From</th>
                        <th>Date To</th>
                        <th>Comments</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {leaveDetails.map((request, index) => (
                        <tr key={`${request.id}-${index}`}>
                            <td>{request.teacherId}</td>
                            <td>{request.name}</td>
                            <td>{request.type}</td>
                            <td>{request.datefrom}</td>
                            <td>{request.dateto}</td>
                            <td>{request.comments}</td>
                            <td>
                                <button onClick={() => handleApprove(request.teacherId)}>Approve</button>
                                <button onClick={() => handleReject(request.teacherId)}>Reject</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {leaveDetails.length === 0 && <p>No leave records found</p>}

        </div>
    );
}

export default AdminDashboard;
