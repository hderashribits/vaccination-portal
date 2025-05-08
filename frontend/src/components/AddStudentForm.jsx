// src/components/AddStudentForm.js
import React, { useState } from 'react';
import { addStudent } from '../api/studentApi';

const initialForm = {
  rollNo: '',
  name: '',
  standard: '',
  section: '',
  gender: 'Male',
  dob: '',
  address: '',
  phone: '',
  email: '',
  parentName: '',
  parentContact: '',
};

function AddStudentForm({ onSuccess }) {
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addStudent(form);
      alert('Student added!');
      setForm(initialForm);
      onSuccess();
    } catch (err) {
      alert('Error adding student');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      {Object.keys(initialForm).map((key) => (
        <div key={key}>
          <label>{key}</label>
          <input
            type={key === 'dob' ? 'date' : 'text'}
            name={key}
            value={form[key]}
            onChange={handleChange}
          />
        </div>
      ))}
      <button type="submit">Add Student</button>
    </form>
  );
}

export default AddStudentForm;
