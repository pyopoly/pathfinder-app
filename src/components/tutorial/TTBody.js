import { useRef } from "react";
import Grid from "../grids/Grid";


const TTBody = () => {

    const dummyRef = useRef(null);

    return (
        <section className="tutorial-body">
            <div>
                <Grid initIcon={"start"} appStates={[]} />
                <p className="description">Start: starting node for the search algorithm. drag to move.</p>
            </div>
            <div>
                <Grid initIcon={"goal"} appStates={[]} />
                <p className="description">Goal: the goal node for the search algorithm. drag to move.</p>
            </div>
            <div>
                <Grid initIcon={"wall"} appStates={[]} />
                <p className="description">Wall: obstacle for the search algorithm. You may add walls by clicking and holding the mouse button down.</p>
            </div>
            <div>
                <Grid initStatus={"visited"} appStates={[]} />
                <p className="description">Visited: nodes that have been visited by the chosen search algorithm.</p>
            </div>
        </section>
    )
}

export default TTBody