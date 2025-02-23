import { TodoType } from "@/App";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Checkbox } from "../components/ui/checkbox";
import { Button, Input, Stack } from "@chakra-ui/react";
import {
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field } from "@/components/ui/field";
import { useForm } from "react-hook-form";

interface Props {
  todo: TodoType;
  newTodo?: boolean;
  handleSave?: (content: string) => void;
  onCheckboxChanged: (todo: TodoType) => void;
  onEditTodo: (todo: TodoType) => void;
  onDeleteTodo: (todo: TodoType) => void;
}

const Todo = ({
  todo,
  onCheckboxChanged,
  onEditTodo,
  onDeleteTodo,
}: Props) => {
  const { register, handleSubmit } = useForm<TodoType>();

  const handleCheckBoxChanged = (checked: boolean) => {
    todo.completed = checked;
    onCheckboxChanged(todo);
  };
  return (
    <Box w={"100%"} borderRadius={"4xl"}>
      <Flex justifyContent={"space-between"}>
        <HStack>
          <Checkbox
            checked={todo.completed}
            onCheckedChange={(details) =>
              handleCheckBoxChanged(details.checked as boolean)
            }
            colorPalette={"green"}
            variant={"outline"}
            size={"sm"}
          ></Checkbox>
          <Text fontSize={"xl"}>{todo.content}</Text>
        </HStack>
        <HStack>
          <DialogRoot>
            <DialogTrigger asChild>
              <IconButton bg={"#ffffff"} size={"sm"}>
                <FaEdit color="#4CAF50" />
              </IconButton>
            </DialogTrigger>
            <DialogContent marginX={"20px"}>
              <form
                onSubmit={handleSubmit((data) => {
                  todo.content = data.content;
                  onEditTodo(todo);
                })}
              >
                <DialogHeader>
                  <DialogTitle>Todo</DialogTitle>
                </DialogHeader>
                <DialogBody pb="4">
                  <Stack gap="4">
                    <Field label="Todo Content">
                      <Input
                        {...register("content")}
                        defaultValue={todo.content}
                        placeholder="Todo Content"
                      />
                    </Field>
                  </Stack>
                </DialogBody>
                <DialogFooter>
                  <DialogActionTrigger asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogActionTrigger>
                  <DialogActionTrigger asChild>
                    <Button type="submit">Edit</Button>
                  </DialogActionTrigger>
                </DialogFooter>
              </form>
            </DialogContent>
          </DialogRoot>

          <IconButton
            onClick={() => onDeleteTodo(todo)}
            bg={"#ffffff"}
            size={"sm"}
          >
            <FaTrash color="#4CAF50" />
          </IconButton>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Todo;
