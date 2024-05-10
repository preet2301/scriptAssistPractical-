import { useEffect } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button, MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import "./App.scss";

export default function App() {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  console.log('isAuthenticated');
  console.log(isAuthenticated);
  const navigate = useNavigate();

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleLogout = () => {
	localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  return (
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      <Button
        variant="light"
        style={{ float: "right", right: "10px" }}
        onClick={handleLogout}
      >
        Logout
      </Button>
      {isAuthenticated ? <Outlet /> : <Navigate to="/login" />}
    </MantineProvider>
  );
}
