import './Grids.css';
import Grid from './Grid';


const Grids = ({ gridMap, appStates}) => {
    // console.log('grids re-render')
    return (
        <div className='grids'>
            {gridMap.map((row, rowIndx) =>
                <div key={rowIndx}>
                    {row.map((value, colIndx) => {
                        const gridIdx = `${rowIndx},${colIndx}`
                        return <Grid
                        key={gridIdx}
                        gridMap={gridMap} 
                        gridIdx={gridIdx}
                        appStates={appStates} />
                    })}
                </div>)}
        </div>
    )
}

export default Grids