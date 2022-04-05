import { useState, useEffect } from 'react';
import './Dropdown.css';
import { MdArrowDropDown } from 'react-icons/md';


const Dropdown = ({ list, searchAlgoStates:[searchAlgoName, setSearchAlgoName] }) => {
    // const [title, setTitle] = useState("Algorithms")
    const [isListOpen, setIsListOpen] = useState(false);
    useEffect(() => {
        const handleWindowClick = () => {
            isListOpen && setIsListOpen(!isListOpen);
        }
        isListOpen && window.addEventListener('click', handleWindowClick);
        return () => window.removeEventListener('click', handleWindowClick);
    }, [isListOpen, setIsListOpen]);
    return (
        <div className="dropdown-wrapper">
            <DropdownHeader title={searchAlgoName} listState={{ isListOpen, setIsListOpen }} />
            {isListOpen && <DropdownList list={list} setTitle={setSearchAlgoName} />}
        </div>
    )
}



const DropdownHeader = ({ title, listState: { isListOpen, setIsListOpen } }) => {
    return (
        <div className={`dropdown-header ${isListOpen && 'dropdown-clicked'}`} onClick={() => setIsListOpen(!isListOpen)} >
            {/* {title} */}
            Algorithms
            <MdArrowDropDown className='icon' />
        </div>
    )
}



const DropdownList = ({ list, setTitle }) => {
    return (
        <div className="dropdown-list">
            {list.map((item) => <span className='dropdown-list-item' key={item} onClick={()=>setTitle(item)}> {item} </span>)}
        </div>
    )
}

export default Dropdown