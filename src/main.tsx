import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import Person from "./pages/person/Person";
import Persons from "./pages/persons/Persons";
import Login from "./components/login";

export const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Persons />,
      },
      {
        path: "/person/:id",
        element: <Person />,    
      },
    ],
  },   
  {
    path: "/login",
    element: <Login />,    
  },
];

const router = createBrowserRouter(routes);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      cacheTime: 1000 * 60 * 15,
    },
  },
});
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>      
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
