import React, { useState, useEffect } from 'react';
import './AddformTeacher.css';

function RegisterForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    qualification: '',
    address: '',
    primaryPhone: '',
    secondaryPhone: '',
    email: '',
    maritalStatus: '',
    dob: '',
    class: '',
    coreSubject: '',
    experience: '',
    grade: '',
    salary: '',
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
    fetch('http://localhost:3000/teachers')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch last ID');
        }
        return response.json();
      })
      .then(data => {
        // Assuming the response is an array of teachers with IDs
        // Extract the last ID from the last item in the array
        const lastTeacher = data[data.length - 1];
        if (lastTeacher && lastTeacher.id) {
          setLastId(lastTeacher.id);
        }
      })
      .catch(error => {
        console.error('Error fetching last ID:', error);
      });
  };

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
    fetch('http://localhost:3000/teachers', {
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
          maritalStatus: '',
          dob: '',
          class: '',
          coreSubject: '',
          experience: '',
          grade: '',
          salary: '',
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
    // Basic email validation regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  
  const isValidPhone = (phone) => {
    // Phone number validation regex
    return /^[0-9]{10}$/.test(phone);
  };

  const validateForm = (data) => {
    let errors = {};
    // Perform validation for each field
    if (!data.firstName.trim()) {
      errors.firstName = 'First name is required';
    }
    if (!data.lastName.trim()) {
      errors.lastName = 'Last name is required';
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
    if (!data.class) {
      errors.class = 'Class is required';
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

  const generateNextId = (lastId) => {
    if (!lastId) return '0T1'; // If no last ID, start from 0T1
    const numericPart = parseInt(lastId.substring(2)) + 1; // Extract numeric part and increment
    return '0T' + numericPart.toString(); // Construct and return the next ID
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
          <label>Secondary Phone:</label>
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
          <label>Marital Status:</label>
          <select
            name="maritalStatus"
            value={formData.maritalStatus}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
            <option value="widowed">Widowed</option>
          </select>
          {validationErrors.maritalStatus && (
            <span className="error">{validationErrors.maritalStatus}</span>
          )}
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
          <label>Salary:</label>
          <input
            type="text"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
          />
          {validationErrors.salary && (
            <span className="error">{validationErrors.salary}</span>
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

export default RegisterForm;