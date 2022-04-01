import { useState } from 'react';
import './Grid.css';
// import StartIcon from '../icons/StartIcon';
// import { useState, useContext } from 'react';

const Grid = ({ children, board, gridIdx, mousedownRef, gridIconRef, appStates:[setStartIdx, setGoalIdx, startIdx, goalIdx]}) => {
  const [gridStatus, setGridStatus] = useState('unvisited');
  board[gridIdx] = {
    status: gridStatus,
    setStatus: setGridStatus
  }
  
  const handleMouseDown = () => {
    mousedownRef.current = true;
    console.log("mousedown", gridIdx, startIdx, mousedownRef.current);

    if (gridIdx===startIdx) {
      gridIconRef.current = "start"
    }
    if (gridIdx===goalIdx) {
      gridIconRef.current = "goal"
    }
    
  }

  const handleMouseUp = () => {
    mousedownRef.current = false;
    gridIconRef.current = "wall"
  }

  const handleMouseOver = () => {
    if (mousedownRef.current) {
      board[gridIdx].setStatus(gridIconRef.current);
    } 
    if (gridIconRef.current==="start") {
      board[startIdx].setStatus('unvisited')
      setStartIdx(gridIdx)
    }
    if (gridIconRef.current==="goal") {
      board[goalIdx].setStatus('unvisited')
      setGoalIdx(gridIdx)
    }
    
  }



  return (
    <div className={
      `grid
      ${gridStatus}
      ${(startIdx === gridIdx) && "start" }
      ${(goalIdx === gridIdx) && "goal" }
      `} 
      // onClick={handleClick} 
      onMouseOver={handleMouseOver}
      onMouseDown={handleMouseDown} 
      onMouseUp={handleMouseUp} 
      >
        {children}
      </div>
  )
}


export default Grid