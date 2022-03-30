import Header from "./components/nav/Header";
import Grids from "./components/grids/Grids";

import Grid from "./components/grids/Grid";
import StartIcon from './components/icons/StartIcon';
import { useEffect, useRef, useState } from "react";


const getWindowDimensions = () => {
  const { innerHeight: height, innerWidth: width } = window;
  return [height, width];
}

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimenstions] = useState(getWindowDimensions());

  function handleResize() {
    setWindowDimenstions(getWindowDimensions());

  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}


const GridStatus = () => {
  return {
    start: false,
    goal: false,
    found: false,
    searching: false,
    wall: false
  }
}

const createGridMap = (rows, columns) => {
  return new Array(rows).fill().map(() => new Array(columns).fill().map(() => GridStatus()));
}

// const size = 25;
// const gridMap = new Array(size).fill().map(() => new Array(size).fill().map(() => Grid()));

const resetGridMap = (gridMap, [setStartIdx, setGoalIdx, setStartGoalSwitch]) => {
  for (let r in gridMap) {
    for (let c in gridMap) {
      gridMap[r][c] = GridStatus();
    }
  }
  setStartIdx(null);
  setGoalIdx(null);
  setStartGoalSwitch(false);
}


const getNeighbours = ([row, col], rowLength, colLength) => {
  row = parseInt(row)
  col = parseInt(col)
  // Check if row and col are inBounds. If false, ... spearding empty [] does nothing.
  let neighbours = [
    ...((row + 1 >= 0 && row + 1 < rowLength) ? [[row + 1, col]] : []),
    ...((row - 1 >= 0 && row - 1 < rowLength) ? [[row - 1, col]] : []),
    ...((col + 1 >= 0 && col + 1 < colLength) ? [[row, col + 1]] : []),
    ...((col - 1 >= 0 && col - 1 < colLength) ? [[row, col - 1]] : []),
  ];
  return neighbours;
}


const bfs = async (gridMap, startIdx, goalIdx, setGoalIdx, [notification, notify]) => {
  if (!startIdx || !goalIdx) return;

  const [startRow, startCol] = startIdx.split(","); parseInt()

  let queue = [[startRow, startCol]]
  let visited = new Set([`${[startRow, startCol]}`])

  while (queue.length > 0) {
    const current = queue.shift();

    // process
    const [r, c] = current;
    if (gridMap[r][c].wall) continue

    gridMap[r][c].searching = true;


    await new Promise(r => setTimeout(r, 0));

    const neighbours = getNeighbours(current, gridMap.length, gridMap[0].length);

    for (let neighbour of neighbours) {
      if (!visited.has(`${neighbour}`)) {
        visited.add(`${neighbour}`);
        queue.push(neighbour);
      }
    }

    if (`${current}` === goalIdx) {
      gridMap[r][c].found = true;
      queue.length = 0
    }
    notify(++notification);
  }
  setGoalIdx(null);
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


  return (
    <div className="App">
      <Header />
      <Grids gridMap={gridMap} setStart={setStartIdx} appStates={appStates} />

      <button onClick={() => {
        console.log(startIdx);
        console.log(goalIdx)
      }}>start, goal</button>
      <button onClick={() => goalIdx ? bfs(gridMap, startIdx, goalIdx, setGoalIdx, notifyChanges) : resetGridMap(gridMap, appStates)}>{goalIdx ? 'bfs' : 'reset'}</button>
      <button onClick={() => notifyChanges[1](notifyChanges[0] + 1)} >refresh</button>
      <Grid

        gridMap={gridMap}
        gridIdx={"0,0"}

        mousedownRef={""}
        appStates={appStates}
      >
        <StartIcon />
      </Grid>


    </div>
  );
}

export default App;