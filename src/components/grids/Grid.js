import { useState } from 'react';
import './Grid.css';
// import StartIcon from '../icons/StartIcon';
// import { useState, useContext } from 'react';

const Grid = ({ children, gridMap, gridIdx, mousedownRef, b, appStates:[setStartIdx, setGoalIdx, setStartGoalSwitch, startIdx, goalIdx, startGoalSwitch, [notification, notify]]}) => {
  // const [selectedStart, setSelectedStart] = useState(false);
  // const [selectedGoal, setSelectedGoal] = useState(false);
  const [row, col] = gridIdx.split(",");
  const [st, setSt] = useState('unvisited');
  b[gridIdx].setStatus = setSt
  // console.log('render Grid')


  const handleClick = () => {
    console.log('clicked ', gridIdx);
    console.log(st)
    // console.log(b[gridIdx])
    if (!startGoalSwitch) {
      // gridMap[row][col].start = !gridMap[row][col].start;
      gridMap[row][col].status = 'start';
      if (startIdx) {
        let [r, c] = startIdx.split(',');
        gridMap[r][c].start = false
      }
      setStartIdx(gridIdx)
      setStartGoalSwitch(!startGoalSwitch)
    } else {
      if (goalIdx) {
        let [r, c] = goalIdx.split(',');
        gridMap[r][c].goal = false
      }
      gridMap[row][col].status = 'goal';
      setGoalIdx(gridIdx)
      setStartGoalSwitch(!startGoalSwitch)
    }
  }

  const handleMouseOver = ()=> {
    if (mousedownRef.current) {
      gridMap[row][col].status = 'wall';
    notify(notification+1)
    }
  }

  // const handleMouse = ()=> {
  //   console.log('mousedown or up')
  //   mousedownRef.current = !mousedownRef.current;
  // } 


  return (
    <div className={
      `grid
      ${gridMap[row][col].status}
      `} 
      onClick={handleClick} 
      // onMouseDown={handleMouse} 
      onMouseOver={handleMouseOver}
      // onMouseUp={handleMouse} 
      >
        {children}
      </div>
  )
}

//   return (
//     <div className={
//       `grid
//       ${gridMap[row][col].start && 'start'}
//       ${gridMap[row][col].goal && 'goal'}
//       ${gridMap[row][col].searching && 'searching'}
//       ${gridMap[row][col].found && 'found'}
//       ${gridMap[row][col].wall && 'wall'}
      
//       ${gridMap[row][col].path && 'path'}
//       `} 
//       onClick={handleClick} 
//       // onMouseDown={handleMouse} 
//       onMouseOver={handleMouseOver}
//       // onMouseUp={handleMouse} 
//       >
//         {children}
//       </div>
//   )
// }


export default Grid