import { useState } from 'react';
import './Test.css';
// import StartIcon from '../icons/StartIcon';
// import { useState, useContext } from 'react';

const Test = () => {

//   const [row, col] = gridIdx.split(",");
const [iconSwitch, setIconSwitch] = useState(false);

  const handleClick = () => {
      setIconSwitch(!iconSwitch);
  }


  return (
    <div className={`gridtest   ${iconSwitch && `visited`}`} 
      onClick={handleClick}
      >
        {/* {children} */}
        
{/* <div className={`start_icon ${iconSwitch && `switch_on`}`}></div> */}
      </div>
  )

// return (
//     <tbody>
//         <tr>
//             <td>s</td>
//             <td>s</td>
//             <td>s</td>
//             <td>s</td>
//         </tr>
//         <tr>
//             <td>s</td>
//             <td>s</td>
//             <td>s</td>
//             <td>s</td>
//         </tr>
//     </tbody>
//     </table>
// )

}


export default Test