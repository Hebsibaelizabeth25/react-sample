import React, { useState } from 'react';
import axios from 'axios';
import './studentform.css';
function Studentform() {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    gender: '',
    qualification: '',
    address: '',
    primaryPhone: '',
    secondaryPhone: '',
    email: '',
    dob: '',
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
    interests: '',
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);

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
      axios
        .post('http://localhost:3000/admin/studentform', formData, {
          headers: {
            Authorization: 'Basic YWRtaW46MTIzNA=='
          }
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
            dob: '',
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
            interests: '',
          });
  
          setValidationErrors({});
          setTimeout(() => {
            setShowPopup(false);
          }, 10000);
        })
        .catch((error) => {
          console.error('Error submitting form data:', error);
        });
    } else {
      setValidationErrors(errors);
    }
  };

  const validateForm = (data) => {
    let errors = {};
  
    if (!data.fname || !data.fname.trim()) {
      errors.fname = 'First name is required';
    }
    if (!data.lname || !data.lname.trim()) {
      errors.lname = 'Last name is required';
    }
    if (!data.gender) {
      errors.gender = 'Gender is required';
    }
    if (!data.address || !data.address.trim()) {
      errors.address = 'Address is required';
    }
    if (!data.primaryPhone || !data.primaryPhone.trim()) {
      errors.primaryPhone = 'Primary phone is required';
    }
    if (!data.email || !data.email.trim()) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(data.email)) {
      errors.email = 'Invalid email address';
    }
    if (!data.section) {
      errors.section = 'Section is required';
    }
    if (!data.dob) {
      errors.dob = 'Date of birth is required';
    }
    if (!data.sclass || !data.sclass.trim()) {
      errors.sclass = 'Class is required';
    }
    if (!data.motherName || !data.motherName.trim()) {
      errors.motherName = "Mother's name is required";
    }
    if (!data.fatherName || !data.fatherName.trim()) {
      errors.fatherName = "Father's name is required";
    }
    if (!data.age || !data.age.trim()) {
      errors.age = 'Age is required';
    }
  
    return errors;
  };

  const closePopup = () => {
    setShowPopup(false);
  };
 
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  const isValidPhone = (phone) => {
    return /^[0-9]{10}$/.test(phone);
  };
  return (
    <div>
      <h2>Add Student Form</h2>
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
            Last Name:
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
          <label>Class:</label>
          <input
            type="text"
            name="sclass"
            value={formData.sclass}
            onChange={handleChange}
          />
          {validationErrors.class && (
            <span className="error">{validationErrors.class}</span>
          )}
        </div>
        <div>
          <label>section:</label>
          <select
            name="section"
            value={formData.section}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
          {validationErrors.section && (
            <span className="error">{validationErrors.section}</span>
          )}
        </div>
        <div>
          <label>
            Age<span className="mandatory">*</span>:
            <input
              type="text"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
            {validationErrors.age && (
              <span className="error">{validationErrors.age}</span>
            )}
          </label>
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
          {validationErrors.address && (
            <span className="error">{validationErrors.address}</span>
          )}
        </div>
        <div>
          <label>
            Father's Phone<span className="mandatory">*</span>:
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
          <label>Mother's Phone:</label>
          <input
            type="text"
            name="secondaryPhone"
            value={formData.secondaryPhone}
            onChange={handleChange}
          />
          {validationErrors.secondaryPhone && (
            <span className="error">{validationErrors.secondaryPhone}</span>
          )}
        </div>
        <div>
          <label>
            Email<span className="mandatory">*</span>:
            <input
              type="email"
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
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />
          {validationErrors.dob && (
            <span className="error">{validationErrors.dob}</span>
          )}
        </div>
        
        <div>
          <label>
            Blood Group<span className="mandatory">*</span>:
            <input
              type="text"
              name="bloodgroup"
              value={formData.bloodgroup}
              onChange={handleChange}
            />
            {validationErrors.bloodgroup && (
              <span className="error">{validationErrors.bloodgroup}</span>
            )}
          </label>
        </div>
        
        <div>
          <label>Mother's Name:</label>
          <input
            type="text"
            name="motherName"
            value={formData.motherName}
            onChange={handleChange}
          />
          {validationErrors.motherName && (
            <span className="error">{validationErrors.motherName}</span>
          )}
        </div>
        <div>
          <label>Father's Name:</label>
          <input
            type="text"
            name="fatherName"
            value={formData.fatherName}
            onChange={handleChange}
          />
          {validationErrors.fatherName && (
            <span className="error">{validationErrors.fatherName}</span>
          )}
        </div>
        <div>
          <label>Mother's Occupation:</label>
          <input
            type="text"
            name="motherOccupation"
            value={formData.motherOccupation}
            onChange={handleChange}
          />
          
        </div>
        <div>
          <label>Father's Occupation:</label>
          <input
            type="text"
            name="fatherOccupation"
            value={formData.fatherOccupation}
            onChange={handleChange}
          />
          
        </div>
        <div>
          <label>
            Interests<span className="mandatory">*</span>:
            <select
              type="text"
              name="interests"
              value={formData.interests}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="A">Sports</option>
              <option value="B">Music</option>
              <option value="C">Yoga</option>
            </select>
            
          </label>
        </div>
        <div>
          <label>Term 1:</label>
          <input
            type="text"
            name="term1"
            value={formData.term1}
            onChange={handleChange}
          />
        
        </div>
        <div>
          <label>Term 2:</label>
          <input
            type="text"
            name="term2"
            value={formData.term2}
            onChange={handleChange}
          />
          
        </div>
        <div>
          <label>Term 3:</label>
          <input
            type="text"
            name="term3"
            value={formData.term3}
            onChange={handleChange}
          />
          
        </div>
        <div>
          <label>Amount Paid:</label>
          <input
            type="text"
            name="amountPaid"
            value={formData.amountPaid}
            onChange={handleChange}
          />
         
        </div>
        <div>
          <label>Outstanding Amount:</label>
          <input
            type="text"
            name="outstandingAmount"
            value={formData.outstandingAmount}
            onChange={handleChange}
          />
          
        </div>

        <div className="submit-button-container">
          <button type="submit">Submit</button>
        </div>
      </form>
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

export default Studentform;