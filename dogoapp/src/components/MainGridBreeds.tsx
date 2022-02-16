import React, { useEffect, useState } from "react";
import { Breed } from "../types";
import {
  Box,
  Heading,
  Flex,
  HStack,
  Spacer,
  Button,
  Center,
  useBreakpointValue,
} from "@chakra-ui/react";
import { getDogsBreeds } from "../main";
import { SingleCard } from "./SingleCard";

const data = getDogsBreeds("");

const MainGridBreeds = () => {
  const [breedsList, setBreedsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = React.useState(10);

  const isSmall = useBreakpointValue({ base: true, md: true, lg: false });

  const indexOfLastItem = currentPage * postsPerPage;
  const indexOfFirstItem = indexOfLastItem - postsPerPage;
  const currentItems = breedsList.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumber = [];

  const totalPageCount = Math.ceil(breedsList.length / postsPerPage);

  for (let i = 1; i <= Math.ceil(breedsList.length / postsPerPage); i++) {
    pageNumber.push(i);
  }

  useEffect(() => {
    data.subscribe(setBreedsList);
    data.subscribe((breeds) => {
      console.log(breeds);
    });
  }, []);
  return (
    <Center margin={"2rem"} p="2rem">
      <Box>
        <Heading as="h1" size="lg" mt="4">
          By Breeds
        </Heading>
        <Flex
          flexWrap="wrap"
          justifyContent="space-between"
          alignItems="center"
          mt="4"
          mb={4}
        >
          {currentItems.map((breed: Breed) => (
            <SingleCard key={breed.id} {...breed} />
          ))}
        </Flex>
        <Center>
          <HStack my={"1.5"}>
            <Button onClick={() => setCurrentPage(currentPage - 1)}>
              Prev
            </Button>
            <Spacer></Spacer>
            <HStack display={["none", "flex", "flex", "flex"]}>
              {!isSmall ? (
                pageNumber.map((item) => (
                  <Button
                    key={item}
                    onClick={() => setCurrentPage(item)}
                    variant={currentPage === item ? "blue" : "gray"}
                  >
                    {item}
                  </Button>
                ))
              ) : (
                <Button border="indigo">
                  {currentPage}
                </Button>
              )}
            </HStack>
            <Button onClick={() => setCurrentPage(currentPage + 1)}>
              Next
            </Button>
          </HStack>
        </Center>
      </Box>
    </Center>
  );
};

export default MainGridBreeds;
