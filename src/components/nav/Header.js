import './Header.css';
import Dropdown from './Dropdown';

const Header = ({ children, height, width, list }) => {
  // console.log('header re-render')
  return (
    <div className="header">
      <span>height: {height}</span>
      <span>width: {width} </span>
      {/* <span>       Header</span> */}
      {/* <button> Start </button> */}

    {children}
    {/* <span> </span> */}
    <Dropdown list={list} />
    
    </div>
  )
}

export default Header