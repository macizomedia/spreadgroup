import * as React from "react";
import { ChakraProvider, Box, VStack, Grid } from "@chakra-ui/react";
import theme from "./theme";
import "@fontsource/koulen/400.css";
import "@fontsource/raleway/400.css";
import "@fontsource/open-sans/700.css";
import ErrorBoundary from "./components/ErrorBoundary";
import NavegationComp from "./components/NavegationComp";
import AppRouter from "./AppRouter";
import { Routes } from "react-router-dom";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <NavegationComp />
        <hr></hr>
        <VStack spacing={8}>
          <ErrorBoundary>
            <AppRouter />
          </ErrorBoundary>
        </VStack>
      </Grid>
    </Box>
  </ChakraProvider>
);
