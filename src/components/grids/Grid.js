import { useState } from 'react';
import './Grid.css';

const Grid = ({ children, board, gridIdx, mousedownRef, gridIconRef: iconRef, appStates: [setStartIdx, setGoalIdx, startIdx, goalIdx] }) => {
  const [gridStatus, setGridStatus] = useState('unvisited');
  const [icon, setIcon] = useState(null);
  board[gridIdx] = {
    status: gridStatus,
    setStatus: setGridStatus,
    icon: icon,
    setIcon: setIcon
  }

  const handleMouseDown = () => {
    mousedownRef.current = true;
    console.log("mousedown", gridIdx, startIdx, mousedownRef.current, "icon:", icon);

    if (icon === "wall") {
      iconRef.current = null;
      setIcon(null);
    } else if (icon) {
      iconRef.current = icon;
    } else {
      setIcon("wall");
    }
  }

  const handleMouseUp = () => {
    mousedownRef.current = false;
    iconRef.current = "wall"
  }

  const handleMouseOver = () => {
    if (mousedownRef.current) {             // only handleMouseOver if mouse is down

      if (!icon || icon === "wall")         // set this Grid's icon       
        setIcon(iconRef.current);
      
      switch (iconRef.current) {            // previous Grid.icon === null, if start/goal
        case "start":
          setStartIdx(gridIdx);
          break;
        case "goal":
          setGoalIdx(gridIdx);
          break;
        default:
          break;
      }
    }
  }



  return (
    <div className={
      `grid
      ${gridStatus}
      ${icon}
      `}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseOver={handleMouseOver}
    >
      {children}
    </div>
  )
}


export default Grid