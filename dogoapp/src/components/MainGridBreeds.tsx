import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Breed } from "../types";
import { Box, Heading, Text, Flex, Image } from "@chakra-ui/react";
import { getDogsBreeds } from "../main";

const data = getDogsBreeds("");

const MainGridBreeds = () => {
  const [breedsList, setBreedsList] = useState([]);

  useEffect(() => {
    data.subscribe(setBreedsList);
    data.subscribe((breeds) => {
      console.log(breeds);
    });
  }, []);
  return (
    <Box>
      <Heading as="h1" size="lg" mt="4">
        By Breeds
      </Heading>
      <Flex
        flexWrap="wrap"
        justifyContent="space-between"
        alignItems="center"
        mt="4"
      >
        {breedsList.map((breed: Breed) => (
          <Box
            key={breed.id}
            as={NavLink}
            to={`/breeds/${breed.id}`}
            p="2"
            flexBasis="100%"
            flexGrow={1}
            maxW="300px"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            _hover={{
              opacity: 0.8,
              borderWidth: "4px",
              borderColor: "teal.500",
              cursor: "pointer",
              transform: "scale(1.05)",
              transition: "all 0.2s",
            }}
          >
            <Image src={breed.image!.url} alt={breed.name} />
            <Box p="6">
              <Heading as="h3" size="md" mt="2">
                {breed.name}
              </Heading>
              <Text>{breed.temperament}</Text>
              <Text>{breed.bred_for}</Text>
            </Box>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default MainGridBreeds;
