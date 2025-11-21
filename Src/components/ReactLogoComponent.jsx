

import React from 'react';

const ReactLogo = ({ color = "#61dafb", size = 100 }) => {
  return (
    
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-11.5 -10.207 23 20.414"
      style={{ height: size, width: size }}
    >
      <title>React Logo</title>
      {}
      <circle cx="0" cy="0" r="2.05" fill={color} /> 
     {}
      <g stroke={color} strokeWidth="1" fill="none"> 
        <ellipse rx="11" ry="4.2" transform="rotate(0)" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
};

export default ReactLogo;

