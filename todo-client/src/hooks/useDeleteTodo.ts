import { TodoType } from "@/App"
import { useState } from "react";

const useDeleteTodo = () => {
    const [deleteTodoData, setDeleteTodoData] = useState<TodoType>({} as TodoType);
    const deleteTodo = async (todo: TodoType, accessToken: string) => {

        const url = "http://localhost:3000/api/todos/" + todo._id;
        const result = await fetch(url, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": accessToken
            }
        });

        const jsonResult = await result.json();

        setDeleteTodoData(jsonResult);

    }

    return { deleteTodo, deleteTodoData };
}

export default useDeleteTodo;