import React, { useState, useEffect } from 'react';
import './studentform.css';

function Studentform() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    qualification: '',
    address: '',
    primaryPhone: '',
    secondaryPhone: '',
    email: '',
    section: '',
    dob: '',
    class: '',
    bloodgroup: '',
    experience: '', // Added missing field
    motherName: '',
    fatherName: '',
    motherOccupation: '',
    fatherOccupation: '',
    age: '',
    term1: '',
    term2: '',
    term3: '',
    amountPaid: '',
    outstandingAmount: '',
    interests: '',
    id: '',
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [lastId, setLastId] = useState('');
  const [showPopup, setShowPopup] = useState(false); // State for popup visibility

  // Fetch the last ID when the component mounts
  useEffect(() => {
    fetchLastId();
  }, []);

  // Fetch the last ID from the server
  const fetchLastId = () => {
    fetch('http://localhost:3000/students')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch last ID');
        }
        return response.json();
      })
      .then(data => {
        const lastStudent = data[data.length - 1];
        if (lastStudent && lastStudent.id) {
          setLastId(lastStudent.id);
        }
      })
      .catch(error => {
        console.error('Error fetching last ID:', error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let error = '';

    // Handle specific validations based on field name
    if (name === 'primaryPhone' || name === 'secondaryPhone') {
      if (value && value.trim() && !isValidPhone(value)) {
        error = 'Invalid phone number';
      }
    } else if (name === 'email') {
      if (value && value.trim() && !isValidEmail(value)) {
        error = 'Invalid email address';
      }
    } else if (name === 'firstName') {
      if (!value || !value.trim()) {
        error = 'First name is required';
      }
    } else if (name === 'lastName') {
      if (!value || !value.trim()) {
        error = 'Last name is required';
      }
    }
    // Add similar conditions for other fields...

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
    e.preventDefault(); // Prevent default form submission behavior
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
  
    const newId = generateNextId(lastId); // Generate the next ID based on the last ID
  
    // Update the form data with the new ID
    const newData = { ...formData, id: newId };
  
    // Perform form submission with newData
    fetch('http://localhost:3000/students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to submit form data');
        }
        return response.json();
      })
      .then(data => {
        console.log('Form data submitted successfully:', data);
        // Show the popup
        setShowPopup(true);
        // Clear form fields after successful submission
        setFormData({
          firstName: '',
          lastName: '',
          gender: '',
          qualification: '',
          address: '',
          primaryPhone: '',
          secondaryPhone: '',
          email: '',
          section: '',
          dob: '',
          class: '',
          bloodgroup: '',
          experience: '', // Add missing field
          motherName: '',
          fatherName: '',
          motherOccupation: '',
          fatherOccupation: '',
          age: '',
          term1: '',
          term2: '',
          term3: '',
          amountPaid: '',
          outstandingAmount: '',
          interests: '',
          id: '',
        });
        setValidationErrors({});
        // Hide the popup after 10 seconds
        setTimeout(() => {
          setShowPopup(false);
        }, 10000);
      })
      .catch(error => {
        console.error('Error submitting form data:', error);
      });
  };
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidPhone = (phone) => {
    return /^[0-9]{10}$/.test(phone);
  };

  const validateForm = (data) => {
    let errors = {};
  
    // Check for empty fields and set errors
    if (!data.firstName || !data.firstName.trim()) {
      errors.firstName = 'First name is required';
    }
    if (!data.lastName || !data.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }
    if (!data.gender) {
      errors.gender = 'Gender is required';
    }
    if (!data.qualification || !data.qualification.trim()) {
      errors.qualification = 'Qualification is required';
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
    if (!data.class || !data.class.trim()) {
      errors.class = 'Class is required';
    }
    if (!data.bloodgroup || !data.bloodgroup.trim()) {
      errors.bloodgroup = 'Blood group is required';
    }
    if (!data.experience || !data.experience.trim()) {
      errors.experience = 'Experience is required';
    }
    if (!data.motherName || !data.motherName.trim()) {
      errors.motherName = 'Mother\'s name is required';
    }
    if (!data.fatherName || !data.fatherName.trim()) {
      errors.fatherName = 'Father\'s name is required';
    }
    if (!data.motherOccupation || !data.motherOccupation.trim()) {
      errors.motherOccupation = 'Mother\'s occupation is required';
    }
    if (!data.fatherOccupation || !data.fatherOccupation.trim()) {
      errors.fatherOccupation = 'Father\'s occupation is required';
    }
    if (!data.age || !data.age.trim()) {
      errors.age = 'Age is required';
    }
    if (!data.term1 || !data.term1.trim()) {
      errors.term1 = 'Term 1 is required';
    }
    if (!data.term2 || !data.term2.trim()) {
      errors.term2 = 'Term 2 is required';
    }
    if (!data.term3 || !data.term3.trim()) {
      errors.term3 = 'Term 3 is required';
    }
    if (!data.amountPaid || !data.amountPaid.trim()) {
      errors.amountPaid = 'Amount paid is required';
    }
    if (!data.outstandingAmount || !data.outstandingAmount.trim()) {
      errors.outstandingAmount = 'Outstanding amount is required';
    }
    if (!data.interests) {
      errors.interests = 'Interests are required';
    }
  
    return errors;
  };

  const generateNextId = (lastId) => {
    if (!lastId) return '0S1'; // If no last ID, start from 0S1
    const numericPart = parseInt(lastId.substring(2)) + 1; // Extract numeric part and increment
    return '0S' + numericPart.toString(); // Construct and return the next ID
  };

  const closePopup = () => {
    setShowPopup(false);
  };
 

  return (
    <div>
      <h2>Register Form</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <div>
          <label>
            First Name<span className="mandatory">*</span>:
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
            {validationErrors.firstName && (
              <span className="error">{validationErrors.firstName}</span>
            )}
          </label>
        </div>
        <div>
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
            {validationErrors.lastName && (
              <span className="error">{validationErrors.lastName}</span>
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
            Class<span className="mandatory">*</span>:
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
          <label>Mother's Phone Number:</label>
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
          <label>Class:</label>
          <input
            type="text"
            name="class"
            value={formData.class}
            onChange={handleChange}
          />
          {validationErrors.class && (
            <span className="error">{validationErrors.class}</span>
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
          {validationErrors.motherOccupation && (
            <span className="error">{validationErrors.motherOccupation}</span>
          )}
        </div>
        <div>
          <label>Father's Occupation:</label>
          <input
            type="text"
            name="fatherOccupation"
            value={formData.fatherOccupation}
            onChange={handleChange}
          />
          {validationErrors.fatherOccupation && (
            <span className="error">{validationErrors.fatherOccupation}</span>
          )}
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
              <option value="A"></option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
            {validationErrors.interests && (
            <span className="error">{validationErrors.interests}</span>
          )}
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
          {validationErrors.term1 && (
            <span className="error">{validationErrors.term1}</span>
          )}
        </div>
        <div>
          <label>Term 2:</label>
          <input
            type="text"
            name="term2"
            value={formData.term2}
            onChange={handleChange}
          />
          {validationErrors.term2 && (
            <span className="error">{validationErrors.term2}</span>
          )}
        </div>
        <div>
          <label>Term 3:</label>
          <input
            type="text"
            name="term3"
            value={formData.term3}
            onChange={handleChange}
          />
          {validationErrors.term3 && (
            <span className="error">{validationErrors.term3}</span>
          )}
        </div>
        <div>
          <label>Amount Paid:</label>
          <input
            type="text"
            name="amountPaid"
            value={formData.amountPaid}
            onChange={handleChange}
          />
          {validationErrors.amountPaid && (
            <span className="error">{validationErrors.amountPaid}</span>
          )}
        </div>
        <div>
          <label>Outstanding Amount:</label>
          <input
            type="text"
            name="outstandingAmount"
            value={formData.outstandingAmount}
            onChange={handleChange}
          />
          {validationErrors.outstandingAmount && (
            <span className="error">{validationErrors.outstandingAmount}</span>
          )}
        </div>


        <div className="submit-button">
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

export default Studentform;