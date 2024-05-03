import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";

function TeacherDetailsPage() {
    const { teacherId } = useParams();
    const [teacher, setTeacher] = useState(null);

    useEffect(() => {
        console.log("teacherId:", teacherId);
        // Fetch teacher details using teacherId
        axios.get(`http://localhost:3000/teachers/${teacherId}`)
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
            <h2>Your Details</h2>
            <div>
                <p>ID: {teacher.id}</p>
                <p>First Name: {teacher.firstName}</p>
                <p>Last Name: {teacher.lastName}</p>
                <p>Gender: {teacher.gender}</p>
                <p>Qualification: {teacher.qualification}</p>


            </div>
        </div>
    );
}

export default TeacherDetailsPage;
