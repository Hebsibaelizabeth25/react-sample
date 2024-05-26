import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './editpageadminT.css';

function EditTeacherPage() {
    const { id } = useParams();
    const [teacher, setTeacher] = useState(null);
    const [formData, setFormData] = useState({
        qualification: '',
        address: '',
        primary: '',
        secondary: '',
        sclass: '',
        maritalStatus: '',
        salary: '',
        experience: '',
        grade: ''
    });

    useEffect(() => {
        fetchTeacher();
    }, []);

    const fetchTeacher = () => {
        axios.get(`http://localhost:3000/admin/teachersdetails/${id}`, {
            headers: {
                Authorization: 'Basic YWRtaW46MTIzNA=='
            }
        })
        .then(response => {
            setTeacher(response.data);
            setFormData({
                qualification: response.data.qualification,
                address: response.data.address,
                primary: response.data.primary,
                secondary: response.data.secondary,
                sclass: response.data.sclass,
                maritalStatus: response.data.maritalStatus,
                salary: response.data.salary,
                experience: response.data.experience,
                grade: response.data.grade
            });
        })
        .catch(error => {
            console.error('Error fetching teacher details:', error);
        });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3000/admin/teacheredit/${id}`, formData, {
            headers: {
                Authorization: 'Basic YWRtaW46MTIzNA=='
            }
        })
        .then(response => {
            console.log('Teacher details updated successfully');
        })
        .catch(error => {
            console.error('Error updating teacher details:', error);
        });
    };

    if (!teacher) {
        return <div>Loading...</div>;
    }

    return (
        <div className="edit-teacher-container">
            <h2>Edit Teacher Details</h2>
            <form className="edit-teacher-form" onSubmit={handleSubmit}>
                <label>
                    First Name:
                    <input type="text" name="fname" value={teacher.fname} disabled />
                </label>
                <label>
                    Last Name:
                    <input type="text" name="lname" value={teacher.lname} disabled />
                </label>
                <label>
                    Gender:
                    <input type="text" name="gender" value={teacher.gender} disabled />
                </label>
                <label>
                    Qualification:
                    <input type="text" name="qualification" value={formData.qualification} onChange={handleChange} />
                </label>
                <label>
                    Address:
                    <input type="text" name="address" value={formData.address} onChange={handleChange} />
                </label>
                <label>
                    Primary:
                    <input type="text" name="primary" value={formData.primary} onChange={handleChange} />
                </label>
                <label>
                    Secondary:
                    <input type="text" name="secondary" value={formData.secondary} onChange={handleChange} />
                </label>
                <label>
                    Class:
                    <input type="text" name="sclass" value={formData.sclass} onChange={handleChange} />
                </label>
                <label>
                    Marital Status:
                    <input type="text" name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} />
                </label>
                <label>
                    Experience:
                    <input type="text" name="experience" value={formData.experience} onChange={handleChange} />
                </label>
                <label>
                    Grade:
                    <input type="text" name="grade" value={formData.grade} onChange={handleChange} />
                </label>
                <label>
                    Salary:
                    <input type="text" name="salary" value={formData.salary} onChange={handleChange} />
                </label>
                <button type="submit">Save</button>
            </form>
        </div>
    );
}

export default EditTeacherPage;
