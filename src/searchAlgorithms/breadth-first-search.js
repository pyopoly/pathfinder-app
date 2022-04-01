const getNeighbours = (idx, rowLength, colLength) => {
    const [row, col] = idx.split(",").map(Number)
    let neighbours = [
        ...((row + 1 >= 0 && row + 1 < rowLength) ? [`${row + 1},${col}`] : []),
        ...((row - 1 >= 0 && row - 1 < rowLength) ? [`${row - 1},${col}`] : []),
        ...((col + 1 >= 0 && col + 1 < colLength) ? [`${row},${col + 1}`] : []),
        ...((col - 1 >= 0 && col - 1 < colLength) ? [`${row},${col - 1}`] : []),
    ];
    return neighbours;
}


const bfs = async (gridMap, startIdx, goalIdx, rowNumber, colNumber) => {
    if (!startIdx || !goalIdx) return;

    const queue = [startIdx]
    let visited = { [startIdx]: null };

    while (queue.length > 0) {
        const current = queue.shift();
        // Processing current node ***
        if (gridMap[current].status === 'wall') continue
        (gridMap[current].status !== 'start') && gridMap[current].setStatus('visited');


        await new Promise(r => setTimeout(r, 0));

        const neighbours = getNeighbours(current, rowNumber, colNumber);

        for (let neighbour of neighbours) {
            if (!(neighbour in visited)) {
                visited[neighbour] = current;
                queue.push(neighbour);
            }
        }

        // Found the Goal ***
        if (current === goalIdx) {
            gridMap[current].setStatus('found')
            queue.length = 0
        }
    }

    let previousNode = visited[goalIdx]
    let path = []
    while (previousNode) {
        path.push(previousNode)
        previousNode = visited[previousNode]
    }

    path.pop();  //pop the first of the path, which is the start node 
    while (path.length > 0) {
        const current = path.pop();
        gridMap[`${current}`].setStatus('path')
        await new Promise(r => setTimeout(r, 100));
    }
    return path
}

export default bfs;