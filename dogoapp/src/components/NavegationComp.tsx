import React from "react";
import { useLocation, NavLink } from "react-router-dom";
import { Box, Button, Flex, Spacer } from "@chakra-ui/react";
import { ColorModeSwitcher } from "../ColorModeSwitcher";

const NavegationComp = () => {
  const location = useLocation();
  return (
    <Flex>
      <Box p="4">
        <NavLink to="/breeds">
          <Button justifySelf="flex-start" colorScheme="teal" size="lg">
            {location.pathname === "/" ? "Home" : "Back"}
          </Button>
        </NavLink>
      </Box>
      <Spacer />
      <Box p="4">
        <ColorModeSwitcher justifySelf="flex-end" />
      </Box>
    </Flex>
  );
};

export default NavegationComp;
