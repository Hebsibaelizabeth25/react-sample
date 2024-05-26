import React, { useState } from 'react';
import './AddformTeacher.css';
import axios from 'axios';

function RegisterForm() {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    gender: '',
    qualification: '',
    address: '',
    primaryPhone: '',
    secondaryPhone: '',
    email: '',
    maritalStatus: '',
    dob: '',
    sclass: '',
    coreSubject: '',
    experience: '',
    grade: '',
    salary: '',
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false); // State for popup visibility

  const handleChange = (e) => {
    const { name, value } = e.target;
    let error = '';

    if (name === 'primaryPhone' || name === 'secondaryPhone') {
      if (value.trim() && !isValidPhone(value)) {
        error = 'Invalid phone number';
      }
    } else if (name === 'email') {
      if (value.trim() && !isValidEmail(value)) {
        error = 'Invalid email address';
      }
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    if (Object.keys(errors).length === 0) {
      axios.post('http://localhost:3000/admin/register', formData, {
        headers: {
          Authorization: 'Basic YWRtaW46MTIzNA==',
        },
      })
      .then((response) => {
        console.log('Form data submitted successfully:', response.data);
        setShowPopup(true);
        setFormData({
          fname: '',
          lname: '',
          gender: '',
          qualification: '',
          address: '',
          primaryPhone: '',
          secondaryPhone: '',
          email: '',
          maritalStatus: '',
          dob: '',
          sclass: '',
          coreSubject: '',
          experience: '',
          grade: '',
          salary: '',
        });
        setValidationErrors({});
        // Hide the popup after 10 seconds
        setTimeout(() => {
          setShowPopup(false);
        }, 8000);
      })
      .catch((error) => {
        console.error('Error submitting form data:', error);
      });
    } else {
      setValidationErrors(errors);
    }
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidPhone = (phone) => {
    return /^[0-9]{10}$/.test(phone);
  };

  const validateForm = (data) => {
    let errors = {};
    if (!data.fname.trim()) {
      errors.fname = 'First name is required';
    }
    if (!data.lname.trim()) {
      errors.lname = 'Last name is required';
    }
    if (!data.gender) {
      errors.gender = 'Gender is required';
    }
    if (!data.qualification.trim()) {
      errors.qualification = 'Qualification is required';
    }
    if (!data.address.trim()) {
      errors.address = 'Address is required';
    }
    if (!data.primaryPhone.trim()) {
      errors.primaryPhone = 'Primary phone is required';
    }
    if (!data.email.trim()) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(data.email)) {
      errors.email = 'Invalid email address';
    }
    if (!data.maritalStatus) {
      errors.maritalStatus = 'Marital status is required';
    }
    if (!data.dob) {
      errors.dob = 'Date of birth is required';
    }
    if (!data.sclass) {
      errors.sclass = 'Class is required';
    }
    if (!data.coreSubject.trim()) {
      errors.coreSubject = 'Core subject is required';
    }
    if (!data.experience.trim()) {
      errors.experience = 'Experience is required';
    }
    if (!data.grade) {
      errors.grade = 'Grade is required';
    }
    if (!data.salary.trim()) {
      errors.salary = 'Salary is required';
    }
    return errors;
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <h2>Add Teacher Form</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <div>
          <label>
            First Name<span className="mandatory">*</span>:
            <input
              type="text"
              name="fname"
              value={formData.fname}
              onChange={handleChange}
            />
            {validationErrors.fname && (
              <span className="error">{validationErrors.fname}</span>
            )}
          </label>
        </div>
        <div>
          <label>
            Last Name<span className="mandatory">*</span>:
            <input
              type="text"
              name="lname"
              value={formData.lname}
              onChange={handleChange}
            />
            {validationErrors.lname && (
              <span className="error">{validationErrors.lname}</span>
            )}
          </label>
        </div>
        <div>
          <label>
            Gender<span className="mandatory">*</span>:
            <select name="gender" value={formData.gender} onChange={handleChange}>
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {validationErrors.gender && (
              <span className="error">{validationErrors.gender}</span>
            )}
          </label>
        </div>
        <div>
          <label>
            Qualification<span className="mandatory">*</span>:
            <input
              type="text"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
            />
            {validationErrors.qualification && (
              <span className="error">{validationErrors.qualification}</span>
            )}
          </label>
        </div>
        <div>
          <label>
            Address<span className="mandatory">*</span>:
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
            {validationErrors.address && (
              <span className="error">{validationErrors.address}</span>
            )}
          </label>
        </div>
        <div>
          <label>
            Primary Phone<span className="mandatory">*</span>:
            <input
              type="text"
              name="primaryPhone"
              value={formData.primaryPhone}
              onChange={handleChange}
            />
            {validationErrors.primaryPhone && (
              <span className="error">{validationErrors.primaryPhone}</span>
            )}
          </label>
        </div>
        <div>
          <label>
            Secondary Phone:
            <input
              type="text"
              name="secondaryPhone"
              value={formData.secondaryPhone}
              onChange={handleChange}
            />
            {validationErrors.secondaryPhone && (
              <span className="error">{validationErrors.secondaryPhone}</span>
            )}
          </label>
        </div>
        <div>
          <label>
            Email<span className="mandatory">*</span>:
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {validationErrors.email && (
              <span className="error">{validationErrors.email}</span>
            )}
          </label>
        </div>
        <div>
          <label>
            Marital Status<span className="mandatory">*</span>:
            <select
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
            </select>
            {validationErrors.maritalStatus && (
              <span className="error">{validationErrors.maritalStatus}</span>
            )}
          </label>
        </div>
        <div>
          <label>
            Date of Birth<span className="mandatory">*</span>:
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
            />
            {validationErrors.dob && (
              <span className="error">{validationErrors.dob}</span>
            )}
          </label>
        </div>
        <div>
          <label>
Class            <input
              type="text"
              name="secondaryPhone"
              value={formData.sclass}
              onChange={handleChange}
            />
            {validationErrors.sclass && (
              <span className="error">{validationErrors.class}</span>
            )}
          </label>
        </div>
        <div>
          <label>
            Core Subject<span className="mandatory">*</span>:
            <input
              type="text"
              name="coreSubject"
              value={formData.coreSubject}
              onChange={handleChange}
            />
            {validationErrors.coreSubject && (
              <span className="error">{validationErrors.coreSubject}</span>
            )}
          </label>
        </div>
        <div>
          <label>
            Experience<span className="mandatory">*</span>:
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
            />
            {validationErrors.experience && (
              <span className="error">{validationErrors.experience}</span>
            )}
          </label>
        </div>
        <div>
          <label>
            Grade<span className="mandatory">*</span>:
            <select
              name="grade"
              value={formData.grade}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
            {validationErrors.grade && (
              <span className="error">{validationErrors.grade}</span>
            )}
          </label>
        </div>
        <div>
          <label>
            Salary<span className="mandatory">*</span>:
            <input
              type="text"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
            />
            {validationErrors.salary && (
              <span className="error">{validationErrors.salary}</span>
            )}
          </label>
        </div>
        <div className="submit-button-container">
          <button type="submit">Submit</button>
        </div>
      </form>
      {/* Popup */}
      {showPopup && (
        <div className="popup-container" onClick={closePopup}>
          <div className="popup">
            <div className="popup-content">
              <p>Form submitted successfully!</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RegisterForm;
