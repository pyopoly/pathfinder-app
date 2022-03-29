import Header from "./components/nav/Header";
// import Grid from "./components/grids/Grid";
import Grids from "./components/grids/Grids";
import { useState } from "react";

const size = 20;
const gridMap = new Array(size).fill(false).map(()=> new Array(size).fill(false));

// let g = {
//   start: true,
//   goal: true,
//   wall: false
// }

const bfs = async (gridMap, start, goal, notifyChange, notifyCallBack) =>  {
  if (start === goal) return true;

  const getNeighbours = ([ row, col ], rowLength, colLength) => {
    row = parseInt(row)
    col = parseInt(col)
    // Check if row and col are inBounds. If false, ... spearding empty [] does nothing.
    let neighbours = [
      ...((row + 1 >= 0 && row + 1 < rowLength) ? [[ row + 1, col ]] : []),
      ...((row - 1 >= 0 && row - 1 < rowLength) ? [[ row - 1, col ]] : []),
      ...((col + 1 >= 0 && col + 1 < colLength) ? [[ row, col + 1 ]] : []),
      ...((col - 1 >= 0 && col - 1 < colLength) ? [[ row, col - 1 ]] : []),
    ];
    return neighbours;
  }

  const [startRow, startCol] = start.split(",");parseInt() 


  let queue = [[startRow, startCol]]
  let visited = new Set()

  while (queue.length > 0) {
    const current = queue.shift();
    visited.add(`${current}`);
    
    // process
    console.log(current)
    const [r, c] = current;
    gridMap[r][c] = true;
    
    
    await new Promise(r => setTimeout(r, 50));

    notifyCallBack(++notifyChange)
    console.log('notify', notifyChange)

    if (`${current}` === goal) {
      console.log('found')
      console.log(current, goal)
      break
    }


    const neighbours = getNeighbours(current, gridMap.length, gridMap[0].length)
    for (let neighbour of neighbours) {
      if (!visited.has(`${neighbour}`)) queue.push(neighbour);
    }
  }
}


function App() {
  console.log('app');
  // bfs(gridMap, '1,1', '3,3')
  const [notifyChange, setNotifyChange] = useState(0)
  const test = () => {
    for (let r in gridMap) {
      for (let c in gridMap) {
        gridMap[r][c] = !gridMap[r][c];
      }
    }
    // setNotifyChange(!notifyChange);
    setNotifyChange(notifyChange+1);
  }

  // const renderTest = () => {
  //   setChange(!change)
  // }

  return (
    <div className="App">
      <Header />
      <Grids gridMap={gridMap} />
      <button onClick={test}>test</button>

      
      <button onClick={() => bfs(gridMap, '1,1', '3,3', notifyChange, setNotifyChange)}>bfs</button>
    </div>
  );
}

export default App;


// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
