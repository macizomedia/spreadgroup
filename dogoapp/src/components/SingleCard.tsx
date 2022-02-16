import { Box, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";
import { Breed } from "../types";

export const SingleCard = ({ id, name, image, bred_for }: Breed) => {
  return (
    <Box
      key={id}
      as={NavLink}
      to={`/breeds/${id}`}
      p="2"
      flexBasis="[30%, 40%, 50%, 60%]"
      flexGrow="[1, 1, 1, 0]"
      maxW="300px"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      _hover={{
        opacity: 0.8,
        borderWidth: "3px",
        borderColor: "teal.500",
        cursor: "pointer",
        transform: "rotate(0.5)",
        transition: "all 0.3s",
      }}
    >
      <Image borderWidth="1px" borderRadius="lg" src={image!.url} alt={name} />
      <Box p="6">
        <Heading as="h3" size="md" mt="2">
          {name}
        </Heading>
        <Text>{bred_for}</Text>
      </Box>
    </Box>
  );
};
