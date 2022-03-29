import './Grids.css';
import Grid from './Grid';


const Grids = ({ gridMap }) => {
    console.log('grids re-render')
    return (
        <div>
            {gridMap.map((row, rowIndx) =>
                <div key={rowIndx}>
                    {row.map((value, colIndx) => {
                        const gridIdx = `${rowIndx},${colIndx}`
                        return <Grid key={gridIdx} gridMap={gridMap} gridIdx={gridIdx} gridVal={gridMap[rowIndx][colIndx]} />
                    })}
                </div>)}
        </div>
    )
}

export default Grids