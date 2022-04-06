import aStarAlgorithm from "./a-star";
import {processAndFindNode, showPath} from "./assistanceFunctions"


const breadthFirstSearch = async (board, startIdx, goalIdx, rowNumber, colNumber) => {
    if (!startIdx || !goalIdx) return;

    const queue = [startIdx]
    let visited = { [startIdx]: null };

    while (queue.length > 0) {
        const current = queue.shift();
        if (board[current].icon === 'wall') continue

        // Processing current node ***
        processAndFindNode(current, queue, visited, { board, goalIdx, rowNumber, colNumber })
        await new Promise(r => setTimeout(r, 0));
    }

    const path = showPath(board, visited, goalIdx);
    return path
}


const depthFirstSearch = async (board, startIdx, goalIdx, rowNumber, colNumber) => {
    if (!startIdx || !goalIdx) return;

    const stack = [startIdx]
    let visited = { [startIdx]: null };

    while (stack.length > 0) {
        const current = stack.pop();
        if (board[current].icon === 'wall') continue

        // Processing current node ***
        processAndFindNode(current, stack, visited, { board, goalIdx, rowNumber, colNumber })
        await new Promise(r => setTimeout(r, 0));
    }

    const path = showPath(board, visited, goalIdx);
    return path
}



// "Breadth-first Search", "Depth-first Search", "A* Search", "Dijkstra's Algorithm"
const searchAlgo = (searchAlgoName, { board, startIdx, goalIdx, rowNumber, colNumber }) => {
    switch (searchAlgoName) {
        case "Breadth-first Search":
            return breadthFirstSearch(board, startIdx, goalIdx, rowNumber, colNumber);
        case "Depth-first Search":
            return depthFirstSearch(board, startIdx, goalIdx, rowNumber, colNumber);
        case "A* Search":
            return aStarAlgorithm(board, startIdx, goalIdx, rowNumber, colNumber);
        default:
            return false;

    }
}


export default searchAlgo;