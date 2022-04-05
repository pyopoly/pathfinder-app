
const recursiveDivision = async (board, obstructions, firstRowIdx, lastRowIdx, firstColIdx, lastColIdx) => {
    await new Promise(r => setTimeout(r, 1000))


    const numRows = lastRowIdx - firstRowIdx + 1;
    const numCols = lastColIdx - firstColIdx + 1;
    if (numRows < 3 && numCols < 3) return
  
  
    // wideArea -> verticalDivide: divide the cols, rowIdxes stay the same
    //          -> "i, middleIdx" middlesIdx (col) stays the same
    //          -> middleIdx:  a number between firstColIdx and lastColIdx, but not the first or last
  
    const randomeMiddleIdx = (firstIdx, lastIdx) => {
      if (lastIdx - firstIdx < 2) return
      return Math.floor(Math.random() * (lastIdx - firstIdx - 1)) + firstIdx + 1;
    }
  
    const wideArea = numRows < numCols;
    // const [firstIdx, lastIdx] = wideArea ? [firstRowIdx, firstRowIdx + rowNumber - 1] : [firstColIdx, firstColIdx + colNumber - 1];
    const [firstIdxRange, lastIdxRange] = wideArea ? [firstColIdx, lastColIdx] : [firstRowIdx, lastRowIdx]
    const [firstIdx, lastIdx] = wideArea ? [firstRowIdx, lastRowIdx] : [firstColIdx, lastColIdx]
    const middleIdx = randomeMiddleIdx(firstIdxRange, lastIdxRange);
    // Math.floor(Math.random() * (lastIdxRange - firstIdxRange - 1)) + firstIdxRange + 1
  
    const verticalDivide = (i) => `${i},${middleIdx}`;
    const horizontalDivide = (i) => `${middleIdx},${i}`;
  
    for (let i = firstIdx; i <= lastIdx; i++) {
      const pos = wideArea ? verticalDivide(i) : horizontalDivide(i);
      board[pos].setIcon('wall');
    }
  
    // create a random hole in the wall 
    const i = Math.floor(Math.random() * (lastIdx - firstIdx)) + firstIdx;
    const pos = wideArea ? verticalDivide(i) : horizontalDivide(i);
    board[pos].setIcon(null);
  
  
    if (wideArea) {
      // Vertical Divide
      recursiveDivision(board, obstructions, firstRowIdx, lastRowIdx, firstColIdx, middleIdx - 1)
      recursiveDivision(board, obstructions, firstRowIdx, lastRowIdx, middleIdx + 1, lastColIdx)
    }
    else {
      // Horizontal Divide
      recursiveDivision(board, obstructions, firstRowIdx, middleIdx - 1, firstColIdx, lastColIdx)
      recursiveDivision(board, obstructions, middleIdx + 1, lastRowIdx, firstColIdx, lastColIdx)
    }

}

const generateBorderWalls = (board, firstRowIdx, lastRowIdx, firstColIdx, lastColIdx) => {
    for (let i = firstRowIdx; i <= lastRowIdx; i++) {
        board[`${i},0`].setIcon('wall');
        board[`${i},${lastColIdx}`].setIcon('wall');
    }
    
    for (let i = firstColIdx; i <= lastColIdx; i++) {
        board[`0,${i}`].setIcon('wall');
        board[`${lastRowIdx},${i}`].setIcon('wall');
    }
}



const generateWalls = async (board, firstRowIdx, lastRowIdx, firstColIdx, lastColIdx, startIdx, goalIdx) => {
    generateBorderWalls(board, firstRowIdx, lastRowIdx, firstColIdx, lastColIdx);
    const obstructions = new Set([ startIdx, goalIdx ]);
    
    recursiveDivision(board, obstructions, firstRowIdx + 1, lastRowIdx - 1, firstColIdx + 1, lastColIdx - 1);
  }
  

  export default generateWalls