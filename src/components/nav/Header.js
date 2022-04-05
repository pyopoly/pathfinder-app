import './Header.css';
import Dropdown from './Dropdown';

const Header = ({ children, height, width, list, searchAlgoStates }) => {
  // console.log('header re-render')
  const [btn, ...rest] = children;
  return (
    <div className="header">
      <span>height: {height}</span>
      <span>width: {width} </span>
      {btn}
      <Dropdown list={list} searchAlgoStates={searchAlgoStates} />
      {rest}

    </div>
  )
}

export default Header