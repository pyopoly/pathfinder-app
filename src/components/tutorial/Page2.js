
// ", "", ""
const Page2 = () => {
  return (
    <section className="tutorial-body">
        <div className="tutorial-body-inner-container">
            <div className="body-items">
                <div className="sub-title-pg2">Breadth-first Search</div>
                
                <p className="sub-description-pg2">gurantees the shortest path using the queue data structure.</p>
            </div>
            <div className="body-items">
                <div className="sub-title-pg2">Depth-first Search</div>
                
                <p className="sub-description-pg2">does not gurantee shortest path. Uses the stack data structure.</p>
            </div>
            <div className="body-items">
                <div className="sub-title-pg2">A* Search</div>
                
                <p className="sub-description-pg2">optimizes next node to search using heuristics and priority queue data structure.</p>
            </div>
            <div className="body-items">
                <div className="sub-title-pg2">Recursive Division Maze</div>
                
                <p className="sub-description-pg2">Create a maze by recursively dividing the room until all rooms are divides.</p>
            </div>
        </div>
    </section>
  )
}

export default Page2