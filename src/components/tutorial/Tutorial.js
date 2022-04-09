import "./Tutorial.css";
import TTHeader from "./TTHeader";
import TTBody from "./TTBody";
import TTFooter from "./TTFooter";
import { useState } from "react";
import Page1 from "./Page1";
import Page2 from "./Page2";

const pages = {
  1: {
    page: 1,
    title: "Pathfinding Algorithm Visualizer",
    subtitle: "See pathfinding algorithms in action. Choose an algorithm to begin",
    body: <Page1 />
  },
  2: {
    page: 2,
    title: "Algorithms & Mazes",
    subtitle: "Try out these algorithms and mazes!",
    body: <Page2 />
  },
}

const Tutorial = ({ setShowTutorial }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const totalPageNum = Object.keys(pages).length;
  return (
    <div className="tutorial-outer">
      <div className="tutorial-container">
        <TTHeader pages={pages} pageNumber={pageNumber} totalPageNum={totalPageNum} />
        <TTBody pages={pages} pageNumber={pageNumber} />
        <TTFooter setShowTutorial={setShowTutorial} pageNumber={pageNumber} setPageNumber={setPageNumber} totalPageNum={totalPageNum} />
      </div>
    </div>
  )
}

export default Tutorial