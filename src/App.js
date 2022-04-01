import Header from "./components/nav/Header";
import Grids from "./components/grids/Grids";

// import Test from "./components/grids/Test";
import StartIcon from './components/icons/StartIcon';
import { useEffect, useRef, useState } from "react";
import useWindowDimensions from "./customHooks/useWindowDimensions";
import bfs from "./searchAlgorithms/breadth-first-search";



// const createGridMap = (rows, columns) => {
//   return new Array(rows).fill().map(() => new Array(columns).fill().map(()=>({status: 'unvisited'})));
// }

const createGridBoard = (rows, columns) => {
  const board = {}
  for (let r = 0; r < rows; r++) {
    for (let c =0; c < columns; c++) {
      board[`${r},${c}`] = {setStatus: null};
    }
  }
  return board
}


const resetGridMap = (board, setSearchAlgoSwitch, [setStartIdx, setGoalIdx]) => {
  for (const gridIdx in board) {
    board[gridIdx].setStatus("unvisited");
  }
  setStartIdx("13,5");
  setGoalIdx("13,15");
  setSearchAlgoSwitch(true)
  // setStartGoalSwitch(false);
}







function App() {
  const [startIdx, setStartIdx] = useState("10,5");
  const [goalIdx, setGoalIdx] = useState("10,15");
  const appStates = [setStartIdx, setGoalIdx, startIdx, goalIdx]

  const [searchAlgoSwitch, setSearchAlgoSwitch] = useState(true);

  const gridSize = 30;
  const [height, width] = useWindowDimensions();
  const rowNumber = Math.floor(height / gridSize);
  const colNumber = Math.floor(width / gridSize);

  const board = useRef(createGridBoard(rowNumber, colNumber)).current;

  return (
    <div className="App">
      <Header />
      <Grids board={board} setStart={setStartIdx} appStates={appStates} rowNumber={rowNumber} colNumber={colNumber}/>

      <button onClick={() => {
        console.log(startIdx);
        console.log(goalIdx)
      }}>start, goal</button>
      <button onClick={() => searchAlgoSwitch ? (()=>{
        let result = bfs(board, startIdx, goalIdx, rowNumber, colNumber);
        setSearchAlgoSwitch(!searchAlgoSwitch);
      })() : (()=>{
        resetGridMap(board, setSearchAlgoSwitch, appStates);
        setSearchAlgoSwitch(!searchAlgoSwitch);
      })()}> {searchAlgoSwitch ? 'bfs' : 'reset'} </button>


    </div>
  );
}

export default App;