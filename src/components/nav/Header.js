import './Header.css';
// import Dropdown from './Dropdown';


const Header = ({ children }) => {
  return (
    <div className="header">
      <span className='app-title'> Search Algorithm App </span>
      {children}
    </div>
  )
}

export default Header