// Login.tsx
import React, { useState } from "react";
import {
  Box,
  Button,
  Notification,
  Paper,
  Text,
  TextInput,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    setError("");
    if (username === "admin@gmail.com" && password === "admin@123") {
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
        <TextInput
          label="Password"
          placeholder="Enter your password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          style={{ marginBottom: 20 }}
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
