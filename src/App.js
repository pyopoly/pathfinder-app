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
    for (let c = 0; c < columns; c++) {
      board[`${r},${c}`] = {};
    }
  }
  return board
}

const resetGridMap = (board, setSearchAlgoSwitch) => {
  for (const gridIdx in board) {
    board[gridIdx].setStatus("unvisited");
  }
  setSearchAlgoSwitch(true)
}


function App() {
  
const searchAlgoList = ["first", "second"];
  const gridSize = 26;
  const [height, width] = useWindowDimensions();
  const rowNumber = Math.floor(height / gridSize) - 2;
  const colNumber = Math.floor(width / gridSize) - 1;

  const [startIdx, setStartIdx] = useState("10,5");
  const [goalIdx, setGoalIdx] = useState("10,15");
  const appStates = [setStartIdx, setGoalIdx, startIdx, goalIdx]

  const [searchAlgoSwitch, setSearchAlgoSwitch] = useState(true);


  const board = useRef(createGridBoard(rowNumber, colNumber)).current;

  useEffect(() => {
    board[startIdx].setIcon("start");
    board[goalIdx].setIcon("goal");
  }, [])


  return (
    <div className="App">
      <Header list={searchAlgoList} height={height} width={width} children={[(

        <button key="0" onClick={() => {
          console.log("startIdx", startIdx);
          console.log("goalIdx", goalIdx);
          console.log("height", height, "width", width);
          console.log("gridsize", gridSize, "rowNum", rowNumber, "colNum", colNumber)
        }}>start, goal</button>), (

        <button key="1" onClick={() => searchAlgoSwitch ? (() => {
          let result = bfs(board, startIdx, goalIdx, rowNumber, colNumber);
          setSearchAlgoSwitch(!searchAlgoSwitch);
        })() : (() => {
          resetGridMap(board, setSearchAlgoSwitch);
          setSearchAlgoSwitch(!searchAlgoSwitch);
        })()}> {searchAlgoSwitch ? 'bfs' : 'reset'} </button>)]} />



      <Grids board={board} setStart={setStartIdx} appStates={appStates} rowNumber={rowNumber} colNumber={colNumber} />


    </div>
  );
}

export default App;