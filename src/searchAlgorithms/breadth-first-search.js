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

    const [startRow, startCol] = startIdx.split(",").map(Number);
    let queue = [[startRow, startCol]];
    // let visited = new Set([`${[startRow, startCol]}`]);
    let visited = { [`${[startRow, startCol]}`]: null };

    while (queue.length > 0) {
        const current = queue.shift();

        // Processing current node ***
        const [r, c] = current;
        if (gridMap[r][c].wall) continue

        gridMap[r][c].status = 'searching';


        await new Promise(r => setTimeout(r, 0));

        const neighbours = getNeighbours(current, gridMap.length, gridMap[0].length);

        for (let neighbour of neighbours) {
            if (!(`${neighbour}` in visited)) {
                visited[`${neighbour}`] = current;
                queue.push(neighbour);
            }
        }

        // Found the Goal ***
        if (`${current}` === goalIdx) {
            gridMap[r][c].status = 'found';
            queue.length = 0
        }
        notify(++notification);
    }
    setGoalIdx(null);
    // return visited;
    let node = visited[goalIdx]
    while (node) {
        console.log("prev: ", node)
        const [r, c] = node
        node = visited[node]

        await new Promise(r => setTimeout(r, 100));
        gridMap[r][c].status = 'path';

        notify(++notification);
    }

    return visited
}

export default bfs;