import Header from "./components/nav/Header";
import Grids from "./components/grids/Grids";
import { useEffect, useRef, useState } from "react";
import useWindowDimensions from "./customHooks/useWindowDimensions";
import searchAlgo from "./searchAlgorithms/breadth-first-search";
import generateMaze from "./mazes/maze";


const createGridBoard = (rows, columns) => {
  const board = {}
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      board[`${r},${c}`] = {};
    }
  }
  return board
}

const resetGridMap = (board) => {
  for (const gridIdx in board) {
    board[gridIdx].setStatus("unvisited");
  }
}


const minHeap = () => {
  console.log('heap');
}

minHeap();


const searchAlgoList = ["Breadth-first Search", "Depth-first Search", "A* Search", "Dijkstra's Algorithm"];

// const useIcon = (board, clearPrevious, iconType) => {
//   // const [icon, setIcon] = useState(iconType);
// }

function App() {
  const gridSize = 26;
  const [height, width] = useWindowDimensions();
  const rowNumber = Math.floor(height / gridSize) - 2;
  const colNumber = Math.floor(width / gridSize) - 1;


  const [startIdx, setStartIdx] = useState(`${Math.floor(rowNumber / 2)},${Math.floor(colNumber * 2 / 6)}`);
  const [goalIdx, setGoalIdx] = useState(`${Math.floor(rowNumber / 2)},${Math.floor(colNumber * 4 / 6)}`);
  const appStates = [setStartIdx, setGoalIdx, startIdx, goalIdx]

  // const [btnToggle, setbtnToggle] = useState(false);
  const [searchAlgoName, setSearchAlgoName] = useState("Choose Algorithm");

  const board = useRef(createGridBoard(rowNumber, colNumber)).current;

  useEffect(() => {
    setStartIdx(`${Math.floor(rowNumber / 2)},${Math.floor(colNumber * 2 / 6)}`)
    setGoalIdx(`${Math.floor(rowNumber / 2)},${Math.floor(colNumber * 4 / 6)}`)
  }, [rowNumber, colNumber])


  useEffect(() => {
    board[startIdx].setIcon("start");
    board[goalIdx].setIcon("goal");
    return () => {
      board[startIdx].setIcon(null);
      board[goalIdx].setIcon(null);
    }
  }, [startIdx, goalIdx, board]);

  return (
    <div className="App">
      <Header
        list={searchAlgoList}
        searchAlgoStates={[searchAlgoName, setSearchAlgoName]}
        height={height}
        width={width}>


        <button className="btn" key="0" onClick={() => {
          console.log("startIdx", startIdx);
          console.log("goalIdx", goalIdx);
          console.log("height", height, "width", width);
          console.log("gridsize", gridSize, "rowNum", rowNumber, "colNum", colNumber)
        }}>start, goal</button>


        <button className="btn" key="1" onClick={() => {
          let result = searchAlgo(searchAlgoName, { board, startIdx, goalIdx, rowNumber, colNumber });
          // if (!result) alert("Please choose an algorithm first");
        }}> {searchAlgoName} </button>

        <button className="btn" key="2" onClick={() => resetGridMap(board)}> Reset </button>
        <button className="btn" key="3" onClick={() => generateMaze(board, 0, rowNumber - 1, 0, colNumber - 1, startIdx, goalIdx)}> Wall </button>

      </Header>


      <Grids board={board} appStates={appStates} rowNumber={rowNumber} colNumber={colNumber} />


    </div>
  );
}

export default App;