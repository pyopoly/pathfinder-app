import { getNeighbours, showPath } from "./assistanceFunctions"
import { minHeap } from "./heap";


const heuristic = (idx, goalIdx) => {
    const [row, col] = idx.split(",").map(Number);
    const [goalRow, goalCol] = goalIdx.split(",").map(Number);

    const distance = Math.abs(goalRow - row) + Math.abs(goalCol - col);
    return distance * 1.4
}


const aStarAlgorithm = async (board, startIdx, goalIdx, rowNumber, colNumber) => {
    if (!startIdx || !goalIdx) return;

    const heap = new minHeap();
    heap.add([0, startIdx], (element)=> element[0]);

    const visited = { [startIdx]: null };
    const costs = { [startIdx]: 0 };

    while (heap.heap.length > 0) {
        const currentnode = heap.getMin((element)=> element[0]);
        const current = currentnode[1];

        // If wall, don't do anything
        if (board[current].icon === 'wall') continue;

        // Check if it's the Goal, break while loop ***
        if (current === goalIdx) {
            board[current].setStatus('found');
            break;
        }

        // Visiting current node
        board[current].setStatus("visited");
        const neighbours = getNeighbours(current, rowNumber, colNumber);
        for (const neighbour of neighbours) {
            const newCost = costs[current] + 1;
            if (!(neighbour in visited) || newCost < costs[neighbour]) {
                visited[neighbour] = current;
                costs[neighbour] = newCost;
                const h = newCost + heuristic(neighbour, goalIdx);
                heap.add([h, neighbour], (element)=> element[0])
            }
        }
        // Delay
        await new Promise(r => setTimeout(r, 0));
    }
    
    // Show Path
    showPath(board, visited, goalIdx)
}


export default aStarAlgorithm;
