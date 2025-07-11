import { createContext, useContext, useReducer } from "react"

const AuthContext = createContext();

function authReducer(state, action){
    switch (action.type) {
        case "LOGIN":
            return { user: action.payload };
        case "LOGOUT":
            return { user: null };
    }
}

function AuthContextProvider({children}) {
    const userStoredValue = JSON.parse(localStorage.getItem('user'));
    const [state, dispatch] = useReducer(authReducer, {
        user: userStoredValue
    })
  return (
    <AuthContext.Provider value={{
        ...state, 
        dispatch
    }}>{children}</AuthContext.Provider>
  )
}

function useAuthConext() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error(
            "can't use AuthContext outside AuthContextProvider"
        );
    }
    return context;
}

export  {AuthContextProvider, useAuthConext}