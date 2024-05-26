// TeacherDetailsPage.jsx
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";

function TeacherDetailsPage() {
    const { teacherId } = useParams();
    const [teacher, setTeacher] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3000/admin/teachersdetails/${teacherId}`, {
            headers: {
                Authorization: 'Basic YWRtaW46MTIzNA==' 
            }
        })
        .then(response => {
            setTeacher(response.data);
        })
        .catch(error => {
            console.error('Error fetching teacher details:', error);
        });
    }, [teacherId]);

    if (!teacher) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Teacher Details</h2>
            <div>
                <p>ID: {teacher._id}</p>
                <p>First Name: {teacher.fname}</p>
                <p>Last Name: {teacher.lname}</p>
                <p>Gender: {teacher.gender}</p>
                <p>Qualification: {teacher.qualification}</p>
            </div>
        </div>
    );
}

export default TeacherDetailsPage;
