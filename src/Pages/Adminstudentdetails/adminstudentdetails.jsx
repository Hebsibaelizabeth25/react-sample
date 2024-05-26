import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";

function StudentViewPage() {
    const { studentId } = useParams();
    const [student, setStudent] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3000/admin/detailsstudent/${studentId}`, {
            headers: {
                Authorization: 'Basic YWRtaW46MTIzNA==' // Your authorization token
            }
        })
        .then(response => {
            setStudent(response.data);
        })
        .catch(error => {
            console.error('Error fetching student details:', error);
        });
    }, [studentId]);

    if (!student) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Student Details</h2>
            <div>
                <p>ID: {student._id}</p>
                <p>First Name: {student.fname}</p>
                <p>Last Name: {student.lname}</p>
                <p>Gender: {student.gender}</p>
                <p>Class: {student.sclass}</p>
            </div>
        </div>
    );
}

export default StudentViewPage;
