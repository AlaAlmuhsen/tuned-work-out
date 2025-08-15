import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useAuthConext } from "../context/AuthContext";
import { useWorkout } from "../context/WorkoutContext";

const { VITE_BASE_DOMAIN } = import.meta.env;


function WorkoutDetails({ workout }) {
    const { id, title, reps, load, created_at } = workout;
    const { user } = useAuthConext();
    const { dispatch } = useWorkout();

    async function handleDelete() {
        if (!user) {
            return
        }
        const response = await fetch(`${VITE_BASE_DOMAIN}/api/workouts/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        });

        const data = await response.json();
        if (response.ok) {
            dispatch({
                type: "DELETE_WORKOUT",
                payload: {
                    id: id
                },
            });
        }

        console.log(data)
    }   

    return (
        <div className="workout-details">
            <h4>{title}</h4>
            <p>
                <strong>Load (Kg): {load}</strong>
            </p>
            <p>
                <strong>Reps: {reps}</strong>
            </p>
            <p>
                {formatDistanceToNow(new Date(created_at), { addSuffix: true })}
            </p>
            <span onClick={handleDelete}>delete</span>
        </div>
    );
}

export default WorkoutDetails;
