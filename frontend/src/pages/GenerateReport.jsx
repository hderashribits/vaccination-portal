// src/pages/GenerateReport.js
import React from 'react';
import Button from '../components/Button';

function GenerateReport() {
  return (
    <div className="generate-report">
      <h2>Generate Report</h2>
      <Button label="Generate Vaccination Report" onClick={() => alert("Report Generated")} />
    </div>
  );
}

export default GenerateReport;
