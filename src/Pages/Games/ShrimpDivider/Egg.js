import React from 'react';

const Egg = ({ size }) => (
  <svg 
    version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    x="0" 
    y="0"
    width={size || 32} 
    height={size || 32} 
    viewBox="0 0 32 32">
	  <path d="M16,32C9.319,32,3.883,26.564,3.883,19.884C3.883,13.252,9.122,0,16,0c6.878,0,12.117,13.252,12.117,19.884
		C28.115,26.564,22.68,32,16,32z M16,1.988c-5.336,0-10.129,12.155-10.129,17.896c0,5.585,4.544,10.128,10.129,10.128
		s10.129-4.543,10.129-10.128C26.129,14.143,21.336,1.988,16,1.988z" />
  </svg>
);

export default Egg;