import React from "react";
import { Heading, Box, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <Box>
      <NavLink to="/dogs">
        <Heading
          as="h1"
          pt="4"
          fontSize="5xl"
          fontWeight="semibold"
          fontFamily="Koulen"
          textTransform="uppercase"
        >
          DogoApp
        </Heading>
      </NavLink>
      <Text fontSize="xl" fontWeight="semibold">
        DogoApp is a simple app to see the dogs breeds
      </Text>
    </Box>
  );
};

export default Header;
