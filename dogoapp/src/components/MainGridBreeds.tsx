import React, { useEffect, useState } from "react";
import { Breed } from "../types";
import {
  Box,
  Flex,
  HStack,
  Spacer,
  Button,
  Center,
  useBreakpointValue,
  Input,
} from "@chakra-ui/react";
import { getDogsBreeds } from "api/main";
import { SingleCard } from "./SingleCard";
import { debounceTime, distinctUntilChanged, map } from "rxjs";

const data = getDogsBreeds("");

const MainGridBreeds = () => {
  const [breedsList, setBreedsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const isSmall = useBreakpointValue({ base: true, md: true, lg: false });

  const indexOfLastItem = currentPage * postsPerPage;
  const indexOfFirstItem = indexOfLastItem - postsPerPage;
  const currentItems = breedsList.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(breedsList.length / postsPerPage); i++) {
    pageNumber.push(i);
  }

  useEffect(() => {
    data.subscribe(setBreedsList);
  }, []);
  return (
    <Center margin={"2rem"} p="2rem">
      <Box>
        <Input
          maxW="40vw"
          placeholder="Search"
          onChange={(e) => {
            data
              .pipe(
                distinctUntilChanged(),
                debounceTime(200),
                map((breeds) =>
                  breeds.filter((breed: { name: string | string[] }) =>
                    breed.name.toString().toLowerCase().includes(e.target.value)
                  )
                )
              )
              .subscribe(setBreedsList);
          }}
        />
        <Flex
          flexWrap="wrap"
          justifyContent="space-between"
          alignItems="center"
          maxWidth="80vw"
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
                <Button border="indigo">{currentPage}</Button>
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
