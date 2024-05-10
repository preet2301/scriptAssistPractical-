// Login.tsx
import React, { useState } from "react";
import {
  Box,
  Button,
  Notification,
  Paper,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>(""); // State variable for the username, initialized as an empty string
  const [password, setPassword] = useState<string>(""); // State variable for the password, initialized as an empty string
  const [error, setError] = useState<string>(""); // State variable for error messages, initialized as an empty string

  const handleLogin = () => {
    setError("");
    if (username === "admin@gmail.com" && password === "admin@123") {
      //static email and password for private public page
      localStorage.setItem("isAuthenticated", "true");
      navigate("/");
    } else {
      setError("Wrong username or password");
    }
  };

  return (
    <Box mt={"20px"} w={"50%"} style={{ margin: "0 auto" }}>
      <Paper p="lg" shadow="lg">
        <Text
          align="center"
          size="xl"
          weight={700}
          style={{ marginBottom: 20 }}
        >
          Login
        </Text>
        <TextInput
          label="Username"
          placeholder="Enter your username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
          style={{ marginBottom: 15 }}
        />

        <PasswordInput
          placeholder="Password"
          description="Password must include at least one letter, number and special character"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        {error && (
          <Notification onClose={() => setError("")} color="red">
            {error}
          </Notification>
        )}
        <br />
        <Button fullWidth onClick={handleLogin}>
          Login
        </Button>
      </Paper>
    </Box>
  );
};

export default Login;
