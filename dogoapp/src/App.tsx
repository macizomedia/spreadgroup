import * as React from "react";
import { ChakraProvider, Box, VStack, Grid, theme } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import Main from "./components/MainGrid";
import { SingleCard } from "./components/SingleCard";
import ErrorBoundary from "./components/ErrorBoundary";
import { Routes, Route } from "react-router-dom";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <VStack spacing={8}>
          <h1>DogoApp</h1>
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/breeds/:breed" element={<SingleCard />} />
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
