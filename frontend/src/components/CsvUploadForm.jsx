// src/components/CSVUploadForm.js
import React, { useState } from 'react';
import { uploadStudentsCSV } from '../api/studentApi';

function CSVUploadForm({ onSuccess }) {
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert('No file selected');

    const formData = new FormData();
    formData.append('file', file);

    try {
      await uploadStudentsCSV(formData);
      alert('CSV uploaded');
      onSuccess();
    } catch (err) {
      alert('Upload failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input type="file" accept=".csv" onChange={(e) => setFile(e.target.files[0])} />
      <button type="submit">Upload CSV</button>
    </form>
  );
}

export default CSVUploadForm;
