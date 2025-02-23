import { useState } from "react";

const useSignIn = () => {
    const [loading, setLoading] = useState(false);
    const [signInError, setSignInError] = useState<string | null>(null);
    const [signedIn, setsignedIn] = useState(false);

    const signIn = async (email: string, password: string) => {
        setLoading(true);
        setSignInError(null);

        try {
            const response = await fetch("http://localhost:3000/api/auth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const token = response.headers.get("X-Auth-Token");
                if (localStorage.getItem("todoAccessToken")) {
                    localStorage.removeItem("todoAccessToken");
                }
                if (token) {
                    localStorage.setItem("todoAccessToken", token);
                    setsignedIn(true);
                }
            } else {
                const result = await response.json();
                setSignInError(result.message);
            }
        } catch (err) {
            setSignInError(err instanceof Error ? err.message : "Some Error");
        } finally {
            setLoading(true);
        }
    };

    return { signIn, loading, signInError, signedIn };
};

export default useSignIn;