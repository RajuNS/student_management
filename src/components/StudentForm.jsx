/**
 * StudentForm.jsx
 * -----------------------------------------------
 * Form component for adding or editing a student.
 *
 * Features:
 *  - Controlled inputs for Name, Email, Age.
 *  - Comprehensive validation (all required, email format, numeric age).
 *  - Pre-fills fields when `studentToEdit` is provided for editing.
 *  - Calls `onSubmit` with the validated student data.
 *  - Calls `onCancel` to dismiss the form (during editing).
 */

import React, { useState, useEffect } from "react";
import { UserPlus, Save, X } from "lucide-react";

/** Simple email regex pattern */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const StudentForm = ({ onSubmit, studentToEdit = null, onCancel }) => {
  // --------- local form state ---------
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [errors, setErrors] = useState({});

  // Pre-fill form when editing an existing student
  useEffect(() => {
    if (studentToEdit) {
      setName(studentToEdit.name);
      setEmail(studentToEdit.email);
      setAge(String(studentToEdit.age));
      setErrors({});
    }
  }, [studentToEdit]);

  /**
   * Validate all form fields and return an errors object.
   * Returns an empty object when everything is valid.
   */
  const validate = () => {
    const newErrors = {};

    // Name validation
    if (!name.trim()) {
      newErrors.name = "Name is required.";
    }

    // Email validation
    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!EMAIL_REGEX.test(email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Age validation
    if (!age.trim()) {
      newErrors.age = "Age is required.";
    } else if (isNaN(Number(age)) || Number(age) <= 0 || !Number.isInteger(Number(age))) {
      newErrors.age = "Age must be a positive whole number.";
    }

    return newErrors;
  };

  /** Handle form submission */
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Build student object
    const studentData = {
      name: name.trim(),
      email: email.trim(),
      age: Number(age),
    };

    onSubmit(studentData);

    // Reset form if adding (not editing)
    if (!studentToEdit) {
      setName("");
      setEmail("");
      setAge("");
    }
    setErrors({});
  };

  /** Reset form state */
  const handleReset = () => {
    setName("");
    setEmail("");
    setAge("");
    setErrors({});
    if (onCancel) onCancel();
  };

  const isEditing = Boolean(studentToEdit);

  return (
    <form className="student-form" onSubmit={handleSubmit} noValidate>
      <h2 className="form-title">
        {isEditing ? (
          <>
            <Save size={20} /> Edit Student
          </>
        ) : (
          <>
            <UserPlus size={20} /> Add New Student
          </>
        )}
      </h2>

      <div className="form-grid">
        {/* ---------- Name ---------- */}
        <div className="form-group">
          <label htmlFor="student-name">Name</label>
          <input
            id="student-name"
            type="text"
            placeholder="Enter full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={errors.name ? "input-error" : ""}
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>

        {/* ---------- Email ---------- */}
        <div className="form-group">
          <label htmlFor="student-email">Email</label>
          <input
            id="student-email"
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={errors.email ? "input-error" : ""}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        {/* ---------- Age ---------- */}
        <div className="form-group">
          <label htmlFor="student-age">Age</label>
          <input
            id="student-age"
            type="number"
            placeholder="Enter age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className={errors.age ? "input-error" : ""}
          />
          {errors.age && <span className="error-text">{errors.age}</span>}
        </div>
      </div>

      {/* ---------- Buttons ---------- */}
      <div className="form-actions">
        <button id="submit-student-btn" type="submit" className="btn btn-primary">
          {isEditing ? (
            <>
              <Save size={16} /> Update Student
            </>
          ) : (
            <>
              <UserPlus size={16} /> Add Student
            </>
          )}
        </button>
        {isEditing && (
          <button
            id="cancel-edit-btn"
            type="button"
            className="btn btn-secondary"
            onClick={handleReset}
          >
            <X size={16} /> Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default StudentForm;
