import { Box, Center, Grid, Image } from "@chakra-ui/react";
import { useBreakpointValue } from "@chakra-ui/react";
import React, { FC } from "react";
import { Dog, Breed } from "../types";

interface DogsProps {
  dogs: Dog[];
}

const DetailsBreed: FC<Breed> = ({
  name,
  bred_for,
  temperament,
  life_span,
}) => {
  return (
    <Box p="6">
      <Box display="flex" alignItems="baseline">
        {/*  <Badge borderRadius="full" px="2" colorScheme="teal">
          New
        </Badge> */}
        <Box
          color="gray.500"
          fontWeight="semibold"
          letterSpacing="wide"
          fontSize="xs"
          textTransform="uppercase"
          ml="2"
        ></Box>
      </Box>

      <Box mt="1" fontWeight="semibold" as="h2" lineHeight="tight" isTruncated>
        {name}
      </Box>
      <Box>
        <Box as="span" color="gray.400" fontSize="sm">
          <h6>{`Life Span: ${life_span}`}</h6>
        </Box>
      </Box>
      <Box display="flex" mt="2" alignItems="center">
        <Box as="span" ml="2" color="gray.600" fontSize="sm">
          {temperament}
        </Box>
      </Box>
      <p>
        <small>{bred_for}</small>
      </p>
    </Box>
  );
};

const Card: FC<Dog> = ({ id, url, breeds }) => {
  return (
    <Box
      key={id}
      minW="300px"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      _hover={{
        opacity: 0.6,
        cursor: "pointer",
        transform: "scale(1.05)",
        transition: "all 0.2s",
      }}
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
    <Center>
      <Grid
        gap={gap}
        mt={20}
        px={20}
        gridAutoFlow="dense"
        templateColumns={[
          `1fr`,
          "1fr",
          `repeat(2, 1fr)`,
          `repeat(3, 1fr)`,
          `repeat(auto-fill, minmax(400px, 1fr))`,
        ]}
        templateRows={[`repeat(5, 1fr)`, "1fr", "1fr", `repeat(3, 1fr)`, `1fr`]}
      >
        {dogs.map((dog) => (
          <Center key={dog.id} p={4}>
            <Card {...dog} />
          </Center>
        ))}
      </Grid>
    </Center>
  );
};

export default DetailsPage;
