import './Grids.css';
import Grid from './Grid';
import { useRef } from 'react';


const Grids = ({ board, appStates, rowNumber, colNumber }) => {
    const mousedownRef = useRef(false)
    const gridIcon = useRef("wall")

    const grids = new Array(rowNumber).fill().map(() => new Array(colNumber).fill().map(() => ({ status: 'unvisited' })));

    return (
        <div onDragStart={(event) => event.preventDefault()} >
            <div className='grids'>
                {grids.map((row, rowIndx) =>
                    <div key={rowIndx} className='rows'>
                        {row.map((value, colIndx) => {
                            const gridIdx = `${rowIndx},${colIndx}`
                            return (
                                <Grid
                                    key={gridIdx}
                                    board={board}
                                    gridIdx={gridIdx}
                                    mousedownRef={mousedownRef}
                                    gridIconRef={gridIcon}
                                    appStates={appStates}
                                />)
                        })}
                    </div>)}
            </div>
        </div>
    )
}

export default Grids