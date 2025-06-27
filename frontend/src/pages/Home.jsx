import { useEffect, useState } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutFrom from "../components/WorkoutFrom";

function Home() {
    const [workouts, setWorkouts] = useState(null);
    useEffect(() => {
        async function fetchWorkouts() {
            const response = await fetch("http://localhost:8000/api/workouts");

            const data = await response.json();
            if (response.ok) {
                setWorkouts(data);
            }
        }

        fetchWorkouts();
    }, []);

    return (
        <div className="home">
            <div className="workouts">
                {workouts &&
                    workouts.map((workout) => (
                        <WorkoutDetails key={workout.id} workout={workout} />
                    ))}
            </div>
            <WorkoutFrom />
        </div>
    );
}

export default Home;
