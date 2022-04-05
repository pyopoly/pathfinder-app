const randomeMiddleIdx = (firstIdx, lastIdx, firstOtherIdx, lastOtherIdx, wideArea, obstructions) => {
    if (lastIdx - firstIdx < 2) return
    let middleIdx = false
    let ends = false
    let count = 0

    do {
        middleIdx = Math.floor(Math.random() * (lastIdx - firstIdx - 1)) + firstIdx + 1;
        ends = wideArea ? [`${firstOtherIdx - 1},${middleIdx}`, `${lastOtherIdx + 1},${middleIdx}`] : [`${middleIdx},${firstOtherIdx - 1}`, `${middleIdx},${lastOtherIdx + 1}`];
        count++
        if (count === 10) {
            console.log('force end', ends)
            middleIdx = false
            break;
        }
    } while (obstructions.has(ends[0]) || obstructions.has(ends[1]))
    return middleIdx;
}




    // wideArea -> verticalDivide: divide the cols, rowIdxes stay the same
    //          -> "i, middleIdx" middlesIdx (col) stays the same
    //          -> middleIdx:  a number between firstColIdx and lastColIdx, but not the first or last
const recursiveDivision = async (board, obstructions, firstRowIdx, lastRowIdx, firstColIdx, lastColIdx) => {
    await new Promise(r => setTimeout(r, 800))

    const numRows = lastRowIdx - firstRowIdx + 1;
    const numCols = lastColIdx - firstColIdx + 1;
    if (numRows < 3 && numCols < 3) return


    const wideArea = numRows < numCols;
    const [firstIdxRange, lastIdxRange, firstIdx, lastIdx] = wideArea ? [firstColIdx, lastColIdx, firstRowIdx, lastRowIdx] : [firstRowIdx, lastRowIdx, firstColIdx, lastColIdx]
    const middleIdx = randomeMiddleIdx(firstIdxRange, lastIdxRange, firstIdx, lastIdx, wideArea, obstructions);
    if (!middleIdx) {
        return
    }

    const verticalDivide = (i) => `${i},${middleIdx}`;
    const horizontalDivide = (i) => `${middleIdx},${i}`;

    for (let i = firstIdx; i <= lastIdx; i++) {
        const pos = wideArea ? verticalDivide(i) : horizontalDivide(i);
        if (!obstructions.has(pos))
            board[pos].setIcon('wall');
    }

    // create a random hole in the wall 
    const i = Math.floor(Math.random() * (lastIdx - firstIdx)) + firstIdx;
    const pos = wideArea ? verticalDivide(i) : horizontalDivide(i);
    if (!obstructions.has(pos)) {

        board[pos].setIcon(null);
        obstructions.add(pos)
    }

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



const generateMaze = async (board, firstRowIdx, lastRowIdx, firstColIdx, lastColIdx, startIdx, goalIdx) => {
    generateBorderWalls(board, firstRowIdx, lastRowIdx, firstColIdx, lastColIdx);
    const obstructions = new Set([startIdx, goalIdx]);

    recursiveDivision(board, obstructions, firstRowIdx + 1, lastRowIdx - 1, firstColIdx + 1, lastColIdx - 1);
    console.log('done')
}


export default generateMaze