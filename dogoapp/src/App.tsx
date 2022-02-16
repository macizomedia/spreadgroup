import * as React from "react";
import {
  ChakraProvider,
  Box,
  VStack,
  Grid,
  theme,
  Text,
  Heading,
} from "@chakra-ui/react";
import Main from "./components/MainGrid";
import ErrorBoundary from "./components/ErrorBoundary";
import { Routes, Route } from "react-router-dom";
import MainGridBreeds from "./components/MainGridBreeds";
import SingleBreed from "./components/SingleBreed";
import NavegationComp from "./components/NavegationComp";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <NavegationComp />
        <VStack spacing={8}>
          <Heading
            as="h1"
            fontSize="5xl"
            fontWeight="semibold"
            textTransform="uppercase"
          >
            DogoApp
          </Heading>
          <Text fontSize="xl" fontWeight="semibold">
            DogoApp is a simple app to see the dogs breeds
          </Text>
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/breeds" element={<MainGridBreeds />} />
              <Route path="/breeds/:id" element={<SingleBreed />} />
              <Route
                path="*"
                element={
                  <main style={{ padding: "1rem" }}>
                    <p>There's nothing here!</p>
                  </main>
                }
              />
            </Routes>
          </ErrorBoundary>
        </VStack>
      </Grid>
    </Box>
  </ChakraProvider>
);
