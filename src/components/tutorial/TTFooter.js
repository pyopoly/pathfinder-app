
const TTFooter = ({ setShowTutorial }) => {
  return (
    <footer className="tutorial-footer">
        <button className="btn" onClick={(()=> void setShowTutorial(false))}>Skip tutorial</button>
        <button className="btn btn-2">Next</button>
        <button className="btn btn-2">Previous</button>
    </footer>
  )
}

export default TTFooter