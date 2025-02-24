import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Input,
  Link,
  VStack,
} from "@chakra-ui/react";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import "./App.css";
import Todo from "./components/Todo";
import { useForm } from "react-hook-form";
import useSaveTodo from "./hooks/useSaveTodo";
import useUpdateTodo from "./hooks/useUpdateTodo";
import { useNavigate } from "react-router-dom";
import useDeleteTodo from "./hooks/useDeleteTodo";
import { BASE_URL } from "../constants";

export interface TodoType {
  _id: string;
  content: string;
  completed: boolean;
}
interface User {
  name: string;
}

function App() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [userName, setUserName] = useState("");
  const [accessToken, setAccessToken] = useState("");

  const { register, handleSubmit } = useForm<TodoType>();

  const { saveTodo, saveTodoData } = useSaveTodo();
  const { updateTodo, updateTodoData } = useUpdateTodo();
  const { deleteTodo, deleteTodoData } = useDeleteTodo();
  const navigate = useNavigate();

  useEffect(() => {
    if (deleteTodoData) {
      setTodos(
        todos.filter((todo) => todo._id !== deleteTodoData._id)
      );
    }
  }, [deleteTodoData]);

  useEffect(() => {
    if (updateTodoData) {
      setTodos(
        todos.map((todo) =>
          todo._id === updateTodoData._id ? updateTodoData : todo
        )
      );
    }
  }, [updateTodoData]);

  useEffect(() => {
    if (saveTodoData) {
      setTodos([...todos, saveTodoData]);
    }
  }, [saveTodoData]);

  useEffect(() => {
    const token = localStorage.getItem("todoAccessToken");
    if (token) {
      setAccessToken(token);
      setUserName(jwtDecode<User>(token).name);
      const fetchTodos = async () => {
        try {
          console.log(BASE_URL + "/api/todos");
          const response = await fetch(BASE_URL + "/api/todos", {
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": token,
            },
          });
          const data = await response.json();
          console.log(data);
          console.log(token);
          setTodos(data);
        } catch (error) {
          console.error("Error fetching todos:", error);
        }
      };
      fetchTodos();
    }
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("todoAccessToken");
    navigate("/");
  };

  return (
    <>
      <Box
        maxW={"450px"}
        width={"100%"}
        p={5}
        mx={"auto"}
        mt={"20px"}
        boxShadow={"md"}
        borderRadius={"md"}
      >
        <Box mb={"20px"}>
          <Heading size={"2xl"} textAlign={"center"}>
            Hello, {userName}!
          </Heading>
          <Center>
            <Link
              fontSize={"lg"}
              color={"#B0B0B0"}
              textDecoration={"underline"}
              onClick={() => handleLogOut()}
            >
              Logout
            </Link>
          </Center>
        </Box>
        <form
          onSubmit={handleSubmit((data) =>
            saveTodo(data, accessToken)
          )}
        >
          <HStack gap={"10px"} mb={"20px"}>
            <Input
              {...register("content")}
              variant={"outline"}
              required
            ></Input>
            <Button size={"sm"} bg={"#4CAF50"} type="submit">
              Save
            </Button>
          </HStack>
        </form>
        <VStack>
          {todos.map((todo, index) => {
            return (
              <Todo
                onCheckboxChanged={(todo) =>
                  updateTodo(todo, accessToken)
                }
                onEditTodo={(todo) =>
                  updateTodo(todo, accessToken)
                }
                onDeleteTodo={(todo) =>
                  deleteTodo(todo, accessToken)
                }
                key={todo._id || index}
                todo={todo}
              />
            );
          })}
        </VStack>
      </Box>
    </>
  );
}

export default App;
