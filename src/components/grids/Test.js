import { useState } from 'react';
import './Test.css';
// import StartIcon from '../icons/StartIcon';
// import { useState, useContext } from 'react';

const Test = () => {
const [iconSwitch, setIconSwitch] = useState(false);

  const handleClick = () => {
      setIconSwitch(!iconSwitch);
  }


  return (
    <div className={`gridtest   ${iconSwitch && `visited`}`} 
      onClick={handleClick}
      >
      </div>
  )

}


export default Test