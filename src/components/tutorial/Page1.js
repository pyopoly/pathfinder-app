import Grid from "../grids/Grid";


const Page1 = () => {
    return (
        <section className="tutorial-body">
            <div className="tutorial-body-inner-container">
                <div className="body-items">
                    <Grid initIcon={"start"} appStates={[]} />
                    <p className="description"><span className="sub-title">Start </span>the start node for the search algorithm. <strong>Drag to move</strong>.</p>
                </div>
                <div className="body-items">
                    <Grid initIcon={"goal"} appStates={[]} />
                    <p className="description"><span className="sub-title">Goal </span>the goal node for the search algorithm. <strong>Drag to move</strong>.</p>
                </div>
                <div className="body-items">
                    <Grid initIcon={"wall"} appStates={[]} />
                    <p className="description"><span className="sub-title">Wall </span>obstacle for the search algorithm. Add walls by <strong>clicking and holding</strong> the mouse button down.</p>
                </div>
                <div className="body-items">
                    <Grid initStatus={"visited"} appStates={[]} />
                    <p className="description"><span className="sub-title">Visited</span>nodes that have been visited by the chosen search algorithm.</p>
                </div>
            </div>
        </section>
    )
}

export default Page1