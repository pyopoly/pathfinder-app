import "./Tutorial.css";
import TTHeader from "./TTHeader";
import TTBody from "./TTBody";
import TTFooter from "./TTFooter";
import { useState } from "react";


const pages = {
  1: {
    page: 1,
    title: "Intro Page",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  2: {
    page: 2,
    title: "Second Page",
    content: "Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
}

const Tutorial = ({ setShowTutorial }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const totalPageNum = pages.length;
  return (
    <div className="tutorial-outer">
      <div className="tutorial-container">
        <TTHeader pages={pages} pageNumber={pageNumber} totalPageNum={totalPageNum} />
        <TTBody />
        <TTFooter setShowTutorial={setShowTutorial} />
      </div>
    </div>
  )
}

export default Tutorial