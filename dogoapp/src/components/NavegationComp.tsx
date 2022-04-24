import React from "react";
import { Box, Flex, Spacer } from "@chakra-ui/react";
import { ColorModeSwitcher } from "ColorModeSwitcher";
import Header from "./Header";
import MenuComp from "./MenuComp";

const NavegationComp = () => {
  return (
    <Flex as="nav" align="center" justify="space-between" wrap="wrap">
      <Box>
        <MenuComp />
      </Box>
      <Spacer />
      <Box display={["none", "none", "none", "flex"]}>
        <Header />
      </Box>
      <Spacer />
      <Box>
        <ColorModeSwitcher />
      </Box>
    </Flex>
  );
};

export default NavegationComp;
