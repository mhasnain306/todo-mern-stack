import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Input,
  Stack,
  Heading,
  Text,
  Field,
} from "@chakra-ui/react";
import useSignIn from "@/hooks/useSignIn";
import { useNavigate } from "react-router-dom";
import useSignup from "@/hooks/useSignup";
import { PasswordInput } from "./ui/password-input";

interface FormData {
  name?: string;
  email: string;
  password: string;
}

const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<FormData>();
  const { signIn, signedIn, signInError } = useSignIn();
  const { signUp, isSignedUp } = useSignup();

  const navigate = useNavigate();

  useEffect(() => {
    if (signedIn || isSignedUp) {
      navigate("/todos");
    }
  }, [signedIn, isSignedUp, navigate]);

  const onSubmit = (data: FormData) => {
    // Simulate an API call
    isSignUp
      ? data.name && signUp(data.name, data.email, data.password)
      : signIn(data.email, data.password);
  };

  return (
    <Box
      maxW="450px"
      mx="auto"
      mt={10}
      p={6}
      boxShadow="md"
      borderRadius="md"
    >
      <Heading mb={4} size="lg" textAlign="center">
        {isSignUp ? "Sign Up" : "Sign In"}
      </Heading>
      {signInError && (
        <Text textAlign={"center"} color={"red"}>
          {signInError}
        </Text>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          {isSignUp && (
            <Box>
              <Field.Root invalid={errors.name ? true : false}>
                <Field.Label>Name</Field.Label>
                <Input
                  {...register("name", {
                    required: "Name is required",
                  })}
                />
                <Field.ErrorText>
                  {errors.name && errors.name.message}
                </Field.ErrorText>
              </Field.Root>
            </Box>
          )}

          <Box>
            <Field.Root invalid={errors.email ? true : false}>
              <Field.Label>Email</Field.Label>
              <Input
                type="email"
                {...register("email", {
                  required: "Email is required",
                })}
              />
              <Field.ErrorText>
                {errors.email && errors.email.message}
              </Field.ErrorText>
            </Field.Root>
          </Box>

          <Box>
            <Field.Root invalid={errors.password ? true : false}>
              <Field.Label>Password</Field.Label>
              <PasswordInput
                {...register("password", {
                  required: "Password is required",
                })}
              />
              <Field.ErrorText>
                {errors.password && errors.password.message}
              </Field.ErrorText>
            </Field.Root>
          </Box>

          <Button type="submit" bg={"#4CAF50"} w="full">
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>

          <Text textAlign="center" fontSize="sm">
            {isSignUp
              ? "Already have an account?"
              : "Don't have an account?"}{" "}
            <Button
              bg={"#4CAF50"}
              size={"sm"}
              onClick={() => {
                clearErrors(["name", "email", "password"]);
                setIsSignUp(!isSignUp);
              }}
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </Button>
          </Text>
        </Stack>
      </form>
    </Box>
  );
};

export default AuthForm;
