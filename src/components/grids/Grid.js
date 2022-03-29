import './Grid.css';
// import { useState, useContext } from 'react';

const Grid = ({ gridMap, gridIdx, appStates:[setStartIdx, setGoalIdx, setStartGoalSwitch, startIdx, goalIdx, startGoalSwitch]}) => {
  // const [selectedStart, setSelectedStart] = useState(false);
  // const [selectedGoal, setSelectedGoal] = useState(false);
  const [row, col] = gridIdx.split(",");
  // console.log('render')

  const handleClick = () => {
    console.log('clicked ', gridIdx)
    // setSelected(!selected);
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

  // useEffect(() => {
  //   console.log('changed')
  // }, [gridVal])

  // console.log('grid re-render')
  //  ${selectedStart && 'start'}
  // 
  // ${selectedGoal && 'goal'}
  return (
    <div className={
      `grid
      ${gridMap[row][col].start && 'start'}
      ${gridMap[row][col].goal && 'goal'}
      ${gridMap[row][col].searching && 'searching'}
      ${gridMap[row][col].found && 'found'}
      `} 
      onClick={handleClick} > </div>
  )
}

// const Grid = ({ gridMap, gridIdx, value }) => {
//   const [selected, setSelected] = useState(false);
//   const [row, col] = gridIdx.split(',');

//   const [val, setVal] = useState(gridMap[row][col])

//   const handleClick = () => {
//     setSelected(!selected);

//     const [row, col] = gridIdx.split(',');
//     gridMap[row][col] = !gridMap[row][col];
//   }

//   useEffect(() => {
//     console.log('changed')
//   }, [value])

//   return (
//     <div className={`grid ${selected && 'selected'}`} onClick={ ()=> handleClick() } > {value && "hi"}</div>
//   )
// }

export default Grid