import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import './adminpage.css'; // Import your CSS file

function AdminDashboard() {
    const [teachers, setTeachers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchTeachers();
    }, []);

    const fetchTeachers = () => {
        axios.get('http://localhost:3000/teachers')
            .then(response => {
                setTeachers(response.data);
            })
            .catch(error => {
                console.error('Error fetching teachers data:', error);
            });
    }

    const handleView = (teacherId) => {
        // Navigate to teacher details page
        navigate(`/teachers/${teacherId}`);
    }

    const handleEdit = (teacherId) => {
        // Navigate to edit teacher page
        navigate(`/teacher/edit/${teacherId}`);
    }

    const handleDelete = (teacherId) => {
        const confirmed = window.confirm("Are you sure you want to delete this teacher?");
        if (confirmed) {
            // Perform delete operation (implement this as per your backend logic)
            axios.delete(`http://localhost:3000/teachers/${teacherId}`)
                .then(response => {
                    console.log('Teacher deleted successfully');
                    // Fetch updated teacher list
                    fetchTeachers();
                })
                .catch(error => {
                    console.error('Error deleting teacher:', error);
                });
        }
    }

    return (
        <div className="admin-container">
            <h2>Hi Admin</h2>
            <Link to="/add-student">
                <button className="button">Add Student</button>
            </Link>
            <Link to="/add-teacher">
                <button className="button">Add Teacher</button>
            </Link>
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
                        <tr key={teacher.id}>
                            <td>{teacher.id}</td>
                            <td>{teacher.firstName}</td>
                            <td>{teacher.lastName}</td>
                            <td>
                                <button onClick={() => handleView(teacher.id)}>View</button>
                                <button onClick={() => handleEdit(teacher.id)}>Edit</button>
                                <button onClick={() => handleDelete(teacher.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminDashboard;