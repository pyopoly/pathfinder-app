import './Header.css';
import { FaGithub } from 'react-icons/fa';

const Header = ({ children }) => {
  return (
    <div className="header">
      <span className='app-title' onClick={()=> void window.location.reload()}> Pathfinder App </span>
      <div className='app-btns'>
        {children}
        <div className='icon-container'>
          <a href='https://github.com/pyopoly/search-algo-app'>
          <FaGithub id="github" />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Header