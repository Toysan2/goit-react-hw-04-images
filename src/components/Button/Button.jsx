import React from 'react';
import './Button.css';

const Button = ({ onClick }) => (
  <button className="Button" onClick={onClick}>
    Load more
  </button>
);

export default Button;
