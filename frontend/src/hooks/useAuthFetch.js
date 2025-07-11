import { useState } from "react";
import { useAuthConext } from "../context/AuthContext";

const { VITE_BASE_DOMAIN } = import.meta.env;

export default function useAuthFetch(url) {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoaing] = useState(false);
    const { dispatch } = useAuthConext();

    async function fetchAuth(email, password) {
        setIsLoaing(true);
        setError(null);

        const response = await fetch(`${VITE_BASE_DOMAIN}${url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            setIsLoaing(false);
            setError(data.error);
        }

        if (response.ok) {
            localStorage.setItem("user", JSON.stringify(data));

            dispatch({ type: "LOGIN", payload: data });

            setIsLoaing(false);
            setError(null);
        }
    }
    return { fetchAuth, isLoading, error };
}
