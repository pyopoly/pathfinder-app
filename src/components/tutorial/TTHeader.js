
const TTHeader = ({ pages, pageNumber, totalPageNum }) => {
    return (
        <header className="tutorial-header">
        <span className="tutorial-pages">{pageNumber}/{totalPageNum}</span>
            <h3 className="tutorial-title">{pages[pageNumber].title}</h3>
            <h3 className="tutorial-title-description">{pages[pageNumber].subtitle}</h3>
        </header>
    )
}

export default TTHeader