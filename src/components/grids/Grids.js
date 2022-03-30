import './Grids.css';
import Grid from './Grid';
import { useRef } from 'react';

const Grids = ({ gridMap, appStates}) => {
    // console.log('grids re-render')
    const mousedownRef = useRef(false)

  const handleMouse = ()=> {
    mousedownRef.current = !mousedownRef.current;
  } 

    // const handleMouseOver

    return (
        <div onMouseUp={handleMouse} onMouseDown={handleMouse} onDragStart={(event)=>event.preventDefault()} >
        <div className='grids'>
            {gridMap.map((row, rowIndx) =>
                <div key={rowIndx}>
                    {row.map((value, colIndx) => {
                        const gridIdx = `${rowIndx},${colIndx}`
                        return <Grid
                        key={gridIdx}
                        gridMap={gridMap} 
                        gridIdx={gridIdx}
                        
                        mousedownRef={mousedownRef}
                        appStates={appStates} />
                    })}
                </div>)}
        </div>
        </div>
    )
}

export default Grids