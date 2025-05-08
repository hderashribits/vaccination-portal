// src/components/Button.js
import React from 'react';

function Button({ label, onClick, className }) {
  return (
    <button className={`btn ${className}`} onClick={onClick}>
      {label}
    </button>
  );
}

export default Button;
