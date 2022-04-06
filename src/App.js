import Header from "./components/nav/Header";
import Grids from "./components/grids/Grids";
import { useEffect, useRef, useState } from "react";
import useWindowDimensions from "./customHooks/useWindowDimensions";
import searchAlgo from "./searchAlgorithms/breadth-first-search";
import generateMaze from "./mazes/maze";
import Dropdown from "./components/nav/Dropdown";

const createGridBoard = (rows, columns) => {
  const board = {}
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      board[`${r},${c}`] = {};
    }
  }
  return board
}

const resetGridMap = (board, wall=false) => {
  for (const gridIdx in board) {
    board[gridIdx].setStatus("unvisited");  //reset status
    (board[gridIdx].icon === "wall" && wall) && board[gridIdx].setIcon(null);  //reset wall
  }
}


const searchAlgoList = ["Breadth-first Search", "Depth-first Search", "A* Search"];  // "Dijkstra's Algorithm"
const mazeAlgoList = ["Recursive Division"];


function App() {
  const gridSize = 26;
  const [height, width] = useWindowDimensions();
  const rowNumber = Math.floor(height / gridSize) - 2;
  const colNumber = Math.floor(width / gridSize) - 1;


  const [startIdx, setStartIdx] = useState(`${Math.floor(rowNumber / 2)},${Math.floor(colNumber * 2 / 6)}`);
  const [goalIdx, setGoalIdx] = useState(`${Math.floor(rowNumber / 2)},${Math.floor(colNumber * 4 / 6)}`);
  const appStates = [setStartIdx, setGoalIdx, startIdx, goalIdx]

  const [searchAlgoName, setSearchAlgoName] = useState("Choose Algorithm");
  const [mazeAlgoName, setMazeAlgoName] = useState("Mazes");

  const board = useRef(createGridBoard(rowNumber, colNumber)).current;

  useEffect(() => {
    setStartIdx(`${Math.floor(rowNumber / 2)},${Math.floor(colNumber * 2 / 6)}`)
    setGoalIdx(`${Math.floor(rowNumber / 2)},${Math.floor(colNumber * 4 / 6)}`)
  }, [rowNumber, colNumber])


  useEffect(() => {
    board[startIdx].setIcon("start");
    board[goalIdx].setIcon("goal");
    resetGridMap(board, true);
    return () => {
      board[startIdx].setIcon(null);
      board[goalIdx].setIcon(null);
    }
  }, [startIdx, goalIdx, board]);

  return (
    <div className="App">
      <Header list={searchAlgoList} searchAlgoStates={[searchAlgoName, setSearchAlgoName]} >

        <Dropdown title="Algorithms" list={searchAlgoList} algoStates={[searchAlgoName, setSearchAlgoName]} callBackList={new Array(searchAlgoList.length).fill((item) => setSearchAlgoName(item))} />
        <button className="btn" onClick={() => {searchAlgo(searchAlgoName, { board, startIdx, goalIdx, rowNumber, colNumber }); resetGridMap(board) }}> {searchAlgoName} </button>
        <Dropdown title="Mazes" list={mazeAlgoList} algoStates={[mazeAlgoName, setMazeAlgoName]} callBackList={[() => { generateMaze(board, 0, rowNumber - 1, 0, colNumber - 1, startIdx, goalIdx);  resetGridMap(board, true); }]} />
        <button className="btn reset-btn" onClick={() => resetGridMap(board, true)}> Reset </button>

      </Header>

      <Grids board={board} appStates={appStates} rowNumber={rowNumber} colNumber={colNumber} />
    </div>
  );
}

export default App;