import { useAuthConext } from "../context/AuthContext";

export function useLogout() {
    const { dispatch } = useAuthConext();

    function logout() {
        localStorage.removeItem('user');

        dispatch({type :"LOGOUT"});
        // complete
    }

    return { logout }

}