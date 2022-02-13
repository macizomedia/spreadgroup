import * as React from "react";
import { ChakraProvider, Box, VStack, Grid, theme } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import ItemPage from "./components/IteamPage";
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
              <Route path="/" element={<ItemPage />} />
            </Routes>
          </ErrorBoundary>
        </VStack>
      </Grid>
    </Box>
  </ChakraProvider>
);
