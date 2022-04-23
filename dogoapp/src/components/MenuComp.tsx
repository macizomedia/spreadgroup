import React, { useState } from "react";
import { Box, Button, useDisclosure } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { NavLink, useLocation } from "react-router-dom";

const MenuComp = () => {
  const location = useLocation();
  const { getButtonProps, getDisclosureProps, isOpen } = useDisclosure();
  const [hidden, setHidden] = useState(!isOpen);
  return (
    <div>
      {" "}
      <Button {...getButtonProps()}>Menu</Button>
      <motion.div
        {...getDisclosureProps()}
        hidden={hidden}
        initial={false}
        onAnimationStart={() => setHidden(false)}
        onAnimationComplete={() => setHidden(!isOpen)}
        animate={{ width: isOpen ? 200 : 0 }}
        style={{
          overflow: "hidden",
          whiteSpace: "nowrap",
          position: "absolute",
          left: "0",
          height: "70vh",
          bottom: "-10",
          zIndex: "1",
        }}
      >
        <Box
          as="nav"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          width="100%"
          height="100%"
          p={4}
          bg="black"
          borderRadius={8}
          boxShadow="0 0 8px rgba(0, 0, 0, 0.125)"
        >
          <NavLink
            to={
              location.pathname === "/breeds"
                ? "/"
                : location.pathname === "/dogs"
                ? "/breeds"
                : "/"
            }
          >
            <Button justifySelf="flex-start" colorScheme="teal" size="lg">
              {location.pathname === "/"
                ? "Home"
                : location.pathname === "/dogs"
                ? "Breeds"
                : location.pathname === "/breeds"
                ? "Home"
                : "Back"}
            </Button>
          </NavLink>
        </Box>
      </motion.div>
    </div>
  );
};

export default MenuComp;
