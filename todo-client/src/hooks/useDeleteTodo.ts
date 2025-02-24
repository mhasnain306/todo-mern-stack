import { TodoType } from "@/App"
import { useState } from "react";
import { BASE_URL } from "../../constants";

const useDeleteTodo = () => {
    const [deleteTodoData, setDeleteTodoData] = useState<TodoType>({} as TodoType);
    const deleteTodo = async (todo: TodoType, accessToken: string) => {

        const url = BASE_URL + "/api/todos/" + todo._id;
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