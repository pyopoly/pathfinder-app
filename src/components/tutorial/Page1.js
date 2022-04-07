import Grid from "../grids/Grid";

const Page1 = () => {
    return (
        <section className="tutorial-body">
            <div className="tutorial-body-inner-container">
                <div className="body-items">
                    <Grid initIcon={"start"} appStates={[]} />
                    <div className="sub-title">Start</div>
                    <p className="sub-description">
                        the start node for the search algorithm. <strong>Drag to move</strong>.
                    </p>
                </div>
                <div className="body-items">
                    <Grid initIcon={"goal"} appStates={[]} />
                    <div className="sub-title">Goal</div>
                    <p className="sub-description">
                        the goal node for the search algorithm. <strong>Drag to move</strong>.
                    </p>
                </div>
                <div className="body-items">
                    <Grid initIcon={"wall"} appStates={[]} />
                    <div className="sub-title">
                        Wall
                    </div>
                    <p className="sub-description">
                        obstacle for the search algorithm. Add walls by <strong>clicking and holding</strong> the mouse button down.
                    </p>
                </div>
                <div className="body-items">
                    <Grid initStatus={"visited"} appStates={[]} />
                    <div className="sub-title">Visited</div>
                    <p className="sub-description">
                        nodes that have been visited by the chosen search algorithm.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Page1