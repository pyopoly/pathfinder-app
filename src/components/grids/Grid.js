import { useState } from 'react';
import './Grid.css';

const Grid = ({board, gridIdx, mousedownRef, gridIconRef: iconRef, appStates: [setStartIdx, setGoalIdx, startIdx, goalIdx], initStatus="unvisited", initIcon=null }) => {
  const [gridStatus, setGridStatus] = useState(initStatus);
  const [icon, setIcon] = useState(initIcon);

  if (board)
    board[gridIdx] = {
      status: gridStatus,
      setStatus: setGridStatus,
      icon: icon,
      setIcon: setIcon,
    }

  const handleMouseDown = () => {
    if (!mousedownRef) return;
    mousedownRef.current = true;
    // console.log("mousedown", gridIdx, startIdx, mousedownRef.current, "icon:", icon);

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
    if (!mousedownRef) return;
    mousedownRef.current = false;
    iconRef.current = "wall"
  }

  const handleMouseOver = () => {
    if (mousedownRef?.current) {            // only handleMouseOver if mouse is down
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
    />
  )
}


export default Grid