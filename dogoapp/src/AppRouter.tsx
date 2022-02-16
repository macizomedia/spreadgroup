import Home from "./components/Home";
import MainGridBreeds from "./components/MainGridBreeds";
import SingleBreed from "./components/SingleBreed";
import { Route, Routes } from "react-router-dom";
import MainGrid from "./components/MainGrid";

const RouteList = [
  {
    path: "/",
    component: <Home />,
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
    <Routes>
      {RouteList.map(({ path, component }) => (
        <Route key={path} path={path} element={component} />
      ))}
    </Routes>
  );
};

export default AppRouter;
