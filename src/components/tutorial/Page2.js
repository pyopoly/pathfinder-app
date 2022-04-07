
// ", "", ""
const Page2 = () => {
  return (
    <section className="tutorial-body">
        <div className="tutorial-body-inner-container">
            <div className="body-items">
                <p className="description"><strong style={{paddingRight:"15px"}}>Breadth-first Search </strong>gurantees the shortest path using the queue data structure.</p>
            </div>
            <div className="body-items">
                <p className="description"><strong style={{paddingRight:"15px"}}>Depth-first Search </strong>does not gurantee shortest path. Uses the stack data structure.</p>
            </div>
            <div className="body-items">
                <p className="description"><strong style={{paddingRight:"15px"}}>A* Search </strong>optimizes next node to search using heuristics and priority queue data structure.</p>
            </div>
            <div className="body-items">
                <p className="description"><strong style={{paddingRight:"15px"}}>Recursive Division Maze</strong> Create a maze by recursively dividing the room until all rooms are divides.</p>
            </div>
        </div>
    </section>
  )
}

export default Page2