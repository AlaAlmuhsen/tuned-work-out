import { useEffect } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutFrom from "../components/WorkoutFrom";
import { useWorkout } from "../context/WorkoutContext";

function Home() {
    const { workouts, dispatch } = useWorkout();
    console.log(workouts);
    useEffect(() => {
        async function fetchWorkouts() {
            const response = await fetch("http://localhost:8000/api/workouts");

            const data = await response.json();
            if (response.ok) {
                dispatch({
                    type: "SET_WORKOUTS",
                    payload: data,
                });
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
