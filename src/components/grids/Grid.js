import { Children } from 'react';
import './Grid.css';
// import StartIcon from '../icons/StartIcon';
// import { useState, useContext } from 'react';

const Grid = ({ children, gridMap, gridIdx, mousedownRef, appStates:[setStartIdx, setGoalIdx, setStartGoalSwitch, startIdx, goalIdx, startGoalSwitch, [notification, notify]]}) => {
  // const [selectedStart, setSelectedStart] = useState(false);
  // const [selectedGoal, setSelectedGoal] = useState(false);
  const [row, col] = gridIdx.split(",");
  // console.log('render')

  const handleClick = () => {
    console.log('clicked ', gridIdx);
    if (!startGoalSwitch) {
      gridMap[row][col].start = !gridMap[row][col].start;
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
      gridMap[row][col].goal = !gridMap[row][col].goal
      setGoalIdx(gridIdx)
      setStartGoalSwitch(!startGoalSwitch)
    }
  }

  const handleMouseOver = ()=> {
    if (mousedownRef.current) {
      gridMap[row][col].wall = !gridMap[row][col].wall;
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
      ${gridMap[row][col].start && 'start'}
      ${gridMap[row][col].goal && 'goal'}
      ${gridMap[row][col].searching && 'searching'}
      ${gridMap[row][col].found && 'found'}
      ${gridMap[row][col].wall && 'wall'}
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


export default Grid