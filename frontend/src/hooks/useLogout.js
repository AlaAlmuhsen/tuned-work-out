import { useAuthConext } from "../context/AuthContext";
import { useWorkout } from "../context/WorkoutContext";

export function useLogout() {
    const { dispatch: authDispatch } = useAuthConext();
    const { dispatch: workDispatch } = useWorkout();

    function logout() {
        localStorage.removeItem("user");

        authDispatch({ type: "LOGOUT" });

        workDispatch({ type: "SET_WORKOUTS", payload: null });
    }

    return { logout };
}
