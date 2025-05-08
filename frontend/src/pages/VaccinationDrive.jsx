// src/pages/VaccinationDrive.js
import React from 'react';

function VaccinationDrive() {
  return (
    <div className="vaccination-drive">
      <h2>Vaccination Drive</h2>
      <form>
        <label>Date of Drive</label>
        <input type="date" />
        <label>Number of Vaccines Available</label>
        <input type="number" />
        <button type="submit">Create Drive</button>
      </form>
    </div>
  );
}

export default VaccinationDrive;
