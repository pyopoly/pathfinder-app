import Header from "./components/nav/Header";
import Grids from "./components/grids/Grids";

import Test from "./components/grids/Test";
import StartIcon from './components/icons/StartIcon';
import { useEffect, useRef, useState } from "react";
import useWindowDimensions from "./customHooks/useWindowDimensions";
import bfs from "./searchAlgorithms/breadth-first-search";



// const GridStatus = () => {
//   return {
//     start: false,
//     goal: false,
//     found: false,
//     searching: false,
//     path: false,
//     wall: false
//   }
// }

// const createGridMap = (rows, columns) => {
//   return new Array(rows).fill().map(() => new Array(columns).fill().map(() => GridStatus()));
// }


const createGridMap = (rows, columns) => {
  return new Array(rows).fill().map(() => new Array(columns).fill().map(()=>({status: 'unvisited'})));
}

const createGridBroard = (rows, columns) => {
  const board = {}
  for (let r = 0; r < rows; r++) {
    for (let c =0; c < columns; c++) {
      board[`${r},${c}`] = {setStatus: null};
    }
  }
  return board
}


// const size = 25;
// const gridMap = new Array(size).fill().map(() => new Array(size).fill().map(() => Grid()));

const resetGridMap = (gridMap, [setStartIdx, setGoalIdx, setStartGoalSwitch]) => {
  for (let r in gridMap) {
    for (let c in gridMap) {
      gridMap[r][c] = 'unvisited';
    }
  }
  setStartIdx(null);
  setGoalIdx(null);
  setStartGoalSwitch(false);
}







function App() {
  const notifyChanges = useState(0);
  const [startIdx, setStartIdx] = useState(null);
  const [goalIdx, setGoalIdx] = useState(null);
  const [startGoalSwitch, setStartGoalSwitch] = useState(false);
  const appStates = [setStartIdx, setGoalIdx, setStartGoalSwitch, startIdx, goalIdx, startGoalSwitch, notifyChanges]

  const gridSize = 30;
  const [height, width] = useWindowDimensions();
  const rowNumber = Math.floor(height / gridSize);
  const colNumber = Math.floor(width / gridSize);
  const gridMap = useRef(createGridMap(rowNumber, colNumber)).current;


  const b = useRef(createGridBroard(rowNumber, colNumber)).current;
  // let b = createGridBroard(5, 10)
  // console.log(b)

  return (
    <div className="App">
      <Header />
      <Grids gridMap={gridMap} setStart={setStartIdx} appStates={appStates} b={b} />

      <button onClick={() => {
        console.log(startIdx);
        console.log(goalIdx)
      }}>start, goal</button>
      <button onClick={() => goalIdx ? (()=>{let result = bfs(gridMap, startIdx, goalIdx, setGoalIdx, notifyChanges);
      // console.log(result.th)
      // result.then(r=>console.log(r))
      })() : resetGridMap(gridMap, appStates)}>{goalIdx ? 'bfs' : 'reset'}</button>
      <button onClick={() => notifyChanges[1](notifyChanges[0] + 1)} >refresh</button>
      <Test>
        {/* <StartIcon /> */}
      </Test>
      <button onClick={()=> {
        b['0,0'].setStatus('now')
      }}>set status</button>


    </div>
  );
}

export default App;