
const TTFooter = ({ setShowTutorial, pageNumber, setPageNumber, totalPageNum }) => {
  return (
    <footer className="tutorial-footer">
        <button className="btn" onClick={(()=> void setShowTutorial(false))}>Skip Tutorial</button>
        <button className="btn btn-2" onClick={() => void ((pageNumber < totalPageNum) && setPageNumber(pageNumber + 1))} >Next</button>
        <button className="btn btn-2" onClick={() => void ((pageNumber > 1) && setPageNumber(pageNumber - 1))} >Previous</button>
    </footer>
  )
}

export default TTFooter