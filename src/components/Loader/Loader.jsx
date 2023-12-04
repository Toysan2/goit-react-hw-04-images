import React from 'react';
import { TailSpin } from 'react-loader-spinner';
import './Loader.css';

const Loader = () => {
  return (
    <div className="loader-container">
      <TailSpin color="#00BFFF" height={80} width={80} />
    </div>
  );
};

export default Loader;
