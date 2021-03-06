import Home from "./components/Home";
import MainGridBreeds from "./components/MainGridBreeds";
import SingleBreed from "./components/SingleBreed";
import { Route, Routes } from "react-router-dom";
import MainGrid from "./components/MainGrid";
import { Box, Grid } from "@chakra-ui/react";
import NavegationComp from "components/NavegationComp";

import "@fontsource/koulen/400.css";
import "@fontsource/raleway/400.css";
import "@fontsource/open-sans/700.css";
import { AuthProvider } from "providers/AuthProvider";
import { Signup } from "pages/Auth/Signup";

const RouteList = [
  {
    path: "/",
    component: <Home />,
  },
  {
    path: "/signup",
    component: <Signup />,
  },
  {
    path: "/dogs",
    component: <MainGrid />,
  },
  {
    path: "/breeds",
    component: <MainGridBreeds />,
  },
  {
    path: "/breeds/:id",
    component: <SingleBreed />,
  },
  {
    path: "*",
    component: () => {
      return (
        <main style={{ padding: "1rem" }}>
          <p>There's nothing here!</p>
        </main>
      );
    },
  },
];

const AppRouter = () => {
  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" px="5rem">
        <AuthProvider>
          <NavegationComp />
          <Routes>
            {RouteList.map(({ path, component }) => (
              <Route key={path} path={path} element={component} />
            ))}
          </Routes>
        </AuthProvider>
      </Grid>
    </Box>
  );
};

export default AppRouter;
