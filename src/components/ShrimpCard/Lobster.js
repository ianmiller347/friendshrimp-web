import React from 'react';

const Lobster = ({ size, className }) => {
  return (
    <svg 
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px" 
      y="0px"
      className={`lobster ${className || ''}`}
      viewBox="0 0 408.333 408.333"
      width={size || 30}
      height={size || 30}
    >
		  <path d="M311.056,164.871c41.82-8.912,73.109-49.495,73.109-84.871c0-70-40-80-40-80c0,71.666-19.216,85.621-20,86.666V30
			c-50,10-50,96.666-50,116.667c0,7.415-5.414,13.575-12.494,14.773c-5.775-44.153-20.583-71.803-33.729-88.309
			c5.77-6.311,12.488-17.252,15.099-35.229c6.586-3.272,11.124-10.049,11.124-17.902c0-11.045-8.955-20-20-20
			c-11.046,0-20,8.955-20,20c0,6.912,3.506,13.003,8.837,16.596c-1.916,11.42-5.84,18.233-8.98,22.042
			c-5.889-4.981-9.856-6.971-9.856-6.971s-3.968,1.99-9.856,6.971c-3.141-3.809-7.064-10.622-8.98-22.042
			c5.33-3.593,8.837-9.685,8.837-16.596c0-11.045-8.955-20-20-20c-11.046,0-20,8.955-20,20c0,7.854,4.537,14.63,11.124,17.902
			c2.61,17.977,9.329,28.917,15.099,35.229c-13.146,16.506-27.953,44.156-33.729,88.309c-7.08-1.198-12.494-7.358-12.494-14.773
			c0-20,0-106.667-50-116.667v56.666c-0.784-1.045-20-15-20-86.666c0,0-40,10-40,80c0,35.377,31.289,75.96,73.109,84.871
			c7.002,19.898,25.135,34.588,46.893,36.558c0,0.08-0.002,0.157-0.002,0.237v15h-21c-13.785,0-25-11.215-25-25h-20
			c0,24.813,20.187,45,45,45h21v15h-21c-24.813,0-45,20.187-45,45h20c0-13.785,11.215-25,25-25h21
			c0,8.095,3.213,15.436,8.425,20.833c-5.212,5.397-8.425,12.737-8.425,20.833c0,10.41,5.304,19.578,13.355,24.958L134.166,385
			c0,0,19.213,23.333,70,23.333c50.787,0,70-23.333,70-23.333l-23.354-46.709c8.051-5.38,13.354-14.548,13.354-24.958
			c0-8.096-3.213-15.436-8.425-20.833c5.212-5.397,8.425-12.738,8.425-20.833h21c13.785,0,25,11.215,25,25h20
			c0-24.813-20.186-45-45-45h-21v-15h21c24.814,0,45-20.187,45-45h-20c0,13.785-11.215,25-25,25h-21v-15
			c0-0.08-0.002-0.158-0.002-0.237C285.923,199.459,304.054,184.77,311.056,164.871z"/>
    </svg>
  );
};

export default Lobster;
