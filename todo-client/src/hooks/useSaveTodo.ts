import { TodoType } from "@/App";
import { useState } from "react";
import { BASE_URL } from "../../constants";


const useSaveTodo = () => {
    const [saveTodoData, setData] = useState<TodoType>({} as TodoType);
    const [error, setError] = useState("");

    const saveTodo = async (todo: TodoType, token: string) => {
        const result = await fetch(BASE_URL + "/api/todos", {
            method: "POST",
            headers: {
                "Content-Type": "application/Json",
                "x-auth-token": token
            },
            body: JSON.stringify(todo)
        });

        const data = await result.json();
        if (data) setData(data);
        else setError("Some error occurred");
    }

    return { saveTodoData, error, saveTodo };
}

export default useSaveTodo;