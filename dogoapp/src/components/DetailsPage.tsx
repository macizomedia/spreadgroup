import { Badge, Box, Center, Grid, Image } from "@chakra-ui/react";
import { useBreakpointValue } from "@chakra-ui/react";
import React, { FC } from "react";
import { Dog, Breed } from "../types";

interface DogsProps {
  dogs: Dog[];
}

const DetailsBreed: FC<Breed> = ({ name, bred_for, temperament }) => {
  return (
    <Box p="6">
      <Box display="flex" alignItems="baseline">
        <Badge borderRadius="full" px="2" colorScheme="teal">
          New
        </Badge>
        <Box
          color="gray.500"
          fontWeight="semibold"
          letterSpacing="wide"
          fontSize="xs"
          textTransform="uppercase"
          ml="2"
        ></Box>
      </Box>

      <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
        {name}
      </Box>

      <Box>
        {bred_for}
        <Box as="span" color="gray.600" fontSize="sm">
          / wk
        </Box>
      </Box>

      <Box display="flex" mt="2" alignItems="center">
        <Box as="span" ml="2" color="gray.600" fontSize="sm">
          {temperament}
        </Box>
      </Box>
    </Box>
  );
};

const Card: FC<Dog> = ({ id, url, breeds }) => {
  return (
    <Box
      key={id}
      minW="200px"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <Image src={url} alt={id} />
      <Box p="6">
        {breeds.length > 0 ? (
          breeds.map((breed: Breed) => (
            <DetailsBreed key={id} {...breed}></DetailsBreed>
          ))
        ) : (
          <h6>Good Boy</h6>
        )}
      </Box>
    </Box>
  );
};

const DetailsPage: FC<DogsProps> = ({ dogs }) => {
  const gap = useBreakpointValue({ base: 3, md: 2 });
  return (
    <div>
      <Grid
        gap={gap}
        mt={20}
        px={20}
        templateColumns={[`repeat(5, 1fr)`, "1fr", "1fr", `repeat(5, 1fr)`]}
        templateRows={[`repeat(5, 1fr)`, "1fr", "1fr", `repeat(3, 1fr)`]}
      >
        {dogs.map((dog) => (
          <Center key={dog.id} p={4}>
            <Card {...dog} />
          </Center>
        ))}
      </Grid>
    </div>
  );
};

export default DetailsPage;
