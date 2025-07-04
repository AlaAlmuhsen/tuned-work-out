import formatDistanceToNow from "date-fns/formatDistanceToNow";

function WorkoutDetails({ workout }) {
    const { title, reps, load, created_at } = workout;
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
            <span>delete</span>
        </div>
    );
}

export default WorkoutDetails;
