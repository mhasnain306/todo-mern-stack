import { useState } from "react";
import { BASE_URL } from "../../constants";

const useSignup = () => {
    const [isSignedUp, setSignedUp] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const signUp = async (name: string, email: string, password: string) => {
        const user = JSON.stringify({ name, email, password });

        try {
            console.log(BASE_URL + "/api/users");

            const response = await fetch(BASE_URL + "/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: user
            });
            if (!response.ok) {
                throw new Error("Couldn't sign up");
            }

            const token = response.headers.get("x-auth-token");
            if (token) {
                if (localStorage.getItem("todoAccessToken")) {
                    localStorage.removeItem("todoAccessToken");
                }
                localStorage.setItem("todoAccessToken", token);

                setSignedUp(true);
            }
            else {
                throw new Error("No token found");
            }

        }
        catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            }
        }
        finally {
            setLoading(true);
        }
    }
    return { signUp, error, isSignedUp, loading };
}

export default useSignup;
