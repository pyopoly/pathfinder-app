import { useState, useEffect } from 'react';
import './Dropdown.css';


const Dropdown = ({ list }) => {
    const [title, setTitle] = useState("Choose a Algorithm")
    const [isListOpen, setIsListOpen] = useState(false);


    useEffect(() => {
        const handleWindowClick = () => {
            isListOpen && setIsListOpen(!isListOpen);
        }
        window.addEventListener('click', handleWindowClick);
        return () => window.removeEventListener('click', handleWindowClick);
    }, [isListOpen, setIsListOpen]);


    return (
        <div className="dropdown-wrapper">
            <DropdownHeader title={title} listState={{ isListOpen, setIsListOpen }} />
            {isListOpen && <DropdownList list={list} setTitle={setTitle} />}
        </div>
    )
}

const DropdownHeader = ({ title, listState: { isListOpen, setIsListOpen } }) => {
    return (
        <div className="dropdown-header" onClick={() => setIsListOpen(!isListOpen)} >
            {title}
        </div>
    )
}

const DropdownList = ({ list, setTitle }) => {
    return (
        <div className="dropdown-list">
            {list.map((item) => <button className='dropdown-list-item' key={item} onClick={()=>setTitle(item)}> {item} </button>)}
        </div>
    )
}

export default Dropdown