import { getNeighbours, showPath } from "./assistanceFunctions"
import { minHeap } from "./heap";


// const heuristic = (idx, startIdx, goalIdx) => {
//     const [row, col] = idx.split(",").map(Number);
//     const [goalRow, goalCol] = goalIdx.split(",").map(Number);
//     const [startRow, startCol] = startIdx.split(",").map(Number);
//     const distance = Math.abs(goalRow - row) + Math.abs(goalCol - col);
    
//     const cost = Math.abs(startRow - row) + Math.abs(startCol - col);
//     let dx = Math.abs(goalRow - row)
//     let dy = Math.abs(goalCol - col);

// return Math.sqrt((dx*dx)   + (dy *dy)) * 1.2 + cost
// }
const heuristic = (idx, startIdx, goalIdx, preCost) => {
    const [row, col] = idx.split(",").map(Number);
    const [goalRow, goalCol] = goalIdx.split(",").map(Number);
    const [startRow, startCol] = startIdx.split(",").map(Number);

    const distance = Math.abs(goalRow - row) + Math.abs(goalCol - col);
    const cost = Math.abs(startRow - row) + Math.abs(startCol - col);
    // let dx = Math.abs(goalRow - row)
    // let dy = Math.abs(goalCol - col);

    return distance 
}



const aStarAlgorithm = async (board, startIdx, goalIdx, rowNumber, colNumber) => {
    if (!startIdx || !goalIdx) return;

    const heap = new minHeap();
    // heap.add([0, startIdx], (element)=> element[0]);
    
    heap.add([0, startIdx, 0], (element)=> element[0]);


    let visited = { [startIdx]: null };

    while (heap.heap.length > 0) {
        // const current = heap.getMin((element)=> element[0])[1];
        
        const currentnode = heap.getMin((element)=> element[0]);
        const currentCost = currentnode[2]
        const current = currentnode[1]


        // If wall, don't do anything
        if (board[current].icon === 'wall') continue;

        // Check if it's the Goal, break while loop ***
        if (current === goalIdx) {
            board[current].setStatus('found');
            break;
        }

        // Visiting current node
        board[current].setStatus("visited");
        // Get neightbours
        const neighbours = getNeighbours(current, rowNumber, colNumber);
        for (const neighbour of neighbours) {
            if (!(neighbour in visited)) {
                visited[neighbour] = current;
                // const h = heuristic(neighbour, startIdx, goalIdx);
                // heap.add([h, neighbour], (element)=> element[0])
                const h = heuristic(neighbour, startIdx, goalIdx, currentCost);
                heap.add([h, neighbour, (currentCost)], (element)=> element[0])
            }
        }
        // Delay
        await new Promise(r => setTimeout(r, 500));
        // Show Path
        showPath(board, visited, goalIdx)
    }
}


export default aStarAlgorithm;
