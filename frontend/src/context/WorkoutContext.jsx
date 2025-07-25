import { createContext, useContext, useReducer } from "react";

const workoutContext = createContext();

const initialValue = {
    workouts: null,
};

function workoutsReducer(state, action) {
    switch (action.type) {
        case "SET_WORKOUTS":
            return {
                ...state,
                workouts: action.payload,
            };
        case "CREATE_WORKOUT":
            return {
                ...state,
                workouts: [action.payload, ...state.workouts],
            };
        case "DELETE_WORKOUT":
            return {
                ...state,
                workouts: state.workouts.filter((w) => w.id !== action.payload.id),
            }
    }
}

function WorkoutContextProvider({ children }) {
    const [state, dispatch] = useReducer(workoutsReducer, initialValue);

    return (
        <workoutContext.Provider
            value={{
                ...state,
                dispatch,
            }}
        >
            {children}
        </workoutContext.Provider>
    );
}

function useWorkout() {
    const context = useContext(workoutContext);
    if (!context) {
        throw new Error(
            "can't use workoutContext outside WorkoutContextProvider"
        );
    }
    return context;
}

export { WorkoutContextProvider, useWorkout };
