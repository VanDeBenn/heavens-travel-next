'use client';

import React from 'react';
import { HashLoader } from 'react-spinners';

interface SpinnerProps {
  color?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ color = "#4F28D9" }) => {
  return (
    <div className="Spinner justify-center flex items-center h-screen">
      <HashLoader color={color} />
    </div>
  );
};

export default Spinner;
