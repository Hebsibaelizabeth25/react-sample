import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './editstudentadmin.css'; 
function StudentEditPage() {
    const { studentId } = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState(null);
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        gender: '',
        address: '',
        email: '',
        sclass: '',
        section: '',
        age: '',
        bloodgroup: '',
        motherName: '',
        fatherName: '',
        motherOccupation: '',
        fatherOccupation: '',
        term1: '',
        term2: '',
        term3: '',
        amountPaid: '',
        outstandingAmount: '',
        interests: ''
    });
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    useEffect(() => {
        fetchStudent();
    }, []);

    const fetchStudent = () => {
        axios.get(`http://localhost:3000/admin/detailsstudent/${studentId}`, {
            headers: {
                Authorization: 'Basic YWRtaW46MTIzNA=='
            }
        })
        .then(response => {
            setStudent(response.data);
            setFormData({
                fname: response.data.fname,
                lname: response.data.lname,
                gender: response.data.gender,
                address: response.data.address,
                email: response.data.email,
                sclass: response.data.sclass,
                section: response.data.section,
                age: response.data.age,
                bloodgroup: response.data.bloodgroup,
                motherName: response.data.motherName,
                fatherName: response.data.fatherName,
                motherOccupation: response.data.motherOccupation,
                fatherOccupation: response.data.fatherOccupation,
                term1: response.data.term1,
                term2: response.data.term2,
                term3: response.data.term3,
                amountPaid: response.data.amountPaid,
                outstandingAmount: response.data.outstandingAmount,
                interests: response.data.interests
            });
        })
        .catch(error => {
            console.error('Error fetching student details:', error);
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
        axios.put(`http://localhost:3000/admin/student-edit/${studentId}`, formData, {
            headers: {
                Authorization: 'Basic YWRtaW46MTIzNA=='
            }
        })
        .then(response => {
            console.log('Student details updated successfully');
            setShowSuccessPopup(true);
            setTimeout(() => setShowSuccessPopup(false), 2000); // Hide popup after 2 seconds
        })
        .catch(error => {
            console.error('Error updating student details:', error);
        });
    };

    if (!student) {
        return <div>Loading...</div>;
    }

    return (

        <div className="edit-student-container">
            <h2>Edit Student Details</h2>
            <form className="edit-student-form" onSubmit={handleSubmit}>
                <div className="row">
                    <label>
                        First Name:
                        <input type="text" name="fname" value={formData.fname} onChange={handleChange} disabled />
                    </label>
                    <label>
                        Last Name:
                        <input type="text" name="lname" value={formData.lname} onChange={handleChange} disabled />
                    </label>
                </div>
                <div className="row">
                    <label>
                        Gender:
                        <input type="text" name="gender" value={formData.gender} onChange={handleChange} disabled />
                    </label>
                    <label>
                        Address:
                        <input type="text" name="address" value={formData.address} onChange={handleChange} />
                    </label>
                </div>
                <div className="row">
                    <label>
                        Email:
                        <input type="text" name="email" value={formData.email} onChange={handleChange} />
                    </label>
                    <label>
                        Class:
                        <input type="text" name="sclass" value={formData.sclass} onChange={handleChange} />
                    </label>
                </div>
                <div className="row">
                    <label>
                        Section:
                        <input type="text" name="section" value={formData.section} onChange={handleChange} />
                    </label>
                    <label>
                        Age:
                        <input type="text" name="age" value={formData.age} onChange={handleChange} />
                    </label>
                </div>
                <div className="row">
                    <label>
                        Blood Group:
                        <input type="text" name="bloodgroup" value={formData.bloodgroup} onChange={handleChange} />
                    </label>
                    <label>
                        Mother's Name:
                        <input type="text" name="motherName" value={formData.motherName} onChange={handleChange} />
                    </label>
                </div>
                <div className="row">
                    <label>
                        Father's Name:
                        <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} />
                    </label>
                    <label>
                        Mother's Occupation:
                        <input type="text" name="motherOccupation" value={formData.motherOccupation} onChange={handleChange} />
                    </label>
                </div>
                <div className="row">
                    <label>
                        Father's Occupation:
                        <input type="text" name="fatherOccupation" value={formData.fatherOccupation} onChange={handleChange} />
                    </label>
                    <label>
                        Term 1:
                        <input type="text" name="term1" value={formData.term1} onChange={handleChange} />
                    </label>
                </div>
                <div className="row">
                    <label>
                        Term 2:
                        <input type="text" name="term2" value={formData.term2} onChange={handleChange} />
                    </label>
                    <label>
                        Term 3:
                        <input type="text" name="term3" value={formData.term3} onChange={handleChange} />
                    </label>
                </div>
                <div className="row">
                    <label>
                        Amount Paid:
                        <input type="text" name="amountPaid" value={formData.amountPaid} onChange={handleChange} />
                    </label>
                    <label>
                        Outstanding Amount:
                        <input type="text" name="outstandingAmount" value={formData.outstandingAmount} onChange={handleChange} />
                    </label>
                </div>
                <div className="row">
                    <label>
                        Interests:
                        <input type="text" name="interests" value={formData.interests} onChange={handleChange} />
                    </label>
                </div>
                <button type="submit">Save</button>
                </form>
            {showSuccessPopup && (
                <div className="success-popup">
                    <p>Student details saved successfully!</p>
                </div>
            )}
        </div>
    );
}
export default StudentEditPage;
