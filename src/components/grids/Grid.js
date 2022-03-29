import './Grid.css';
import { useState, useEffect } from 'react';

const Grid = ({ gridMap, gridIdx, gridVal }) => {
  const [selected, setSelected] = useState(false);
  const [row, col] = gridIdx.split(",");

  const handleClick = () => {
    setSelected(!selected);
  }

  useEffect(() => {
    console.log('changed')
  }, [gridVal])
  
  console.log('grid re-render')
  return (
    <div className={`grid ${selected && 'selected'} ${gridMap[row][col] && 'test'}`} onClick={handleClick} > </div>
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