import { useState, useEffect } from 'react';
import { MdArrowDropDown } from 'react-icons/md';
import './Dropdown.css';

/**
 * 
 * @param {*} param0 
 * @returns 
 */
const Dropdown = ({ title, list, callBackList }) => {
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
            <DropdownHeader title={title} listState={{ isListOpen, setIsListOpen }} />
            {isListOpen && <DropdownList list={list} callBackList={callBackList} />}
        </div>
    )
}



const DropdownHeader = ({ title, listState: { isListOpen, setIsListOpen } }) => {
    return (
        <div className={`dropdown-header ${isListOpen && 'dropdown-clicked'}`} onClick={() => setIsListOpen(!isListOpen)} >
            {title}
            <MdArrowDropDown className='icon' />
        </div>
    )
}



const DropdownList = ({ list, callBackList }) => {
    return (
        <div className="dropdown-list">
            {list.map((item, idx) => <span className='dropdown-list-item' key={item} onClick={()=>callBackList[idx](item)}> {item} </span>)}
        </div>
    )
}

export default Dropdown