import React, { useState } from 'react';
const DashBoard: React.FC = () => {
  const [value, setValue] = useState(11);
  const onChange = (e: any) => {
    const target = e.target;
    setValue(target.value);
  };

  return (
    <div className="app-container" style={{ height: '200vh' }}>
      {value}
      <input defaultValue="222" onChange={onChange}></input>
    </div>
  );
};

export default DashBoard;
