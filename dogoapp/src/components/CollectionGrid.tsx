import {
  Box,
  Text,
  Center,
  Grid,
  Image,
  Link,
  VStack,
  Button,
} from "@chakra-ui/react";
import { useBreakpointValue } from "@chakra-ui/react";
import React, { FC, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
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
    <NavLink
      style={({ isActive }) => {
        return {
          display: "block",
          margin: "1rem 0",
          color: isActive ? "red" : "",
        };
      }}
      to={breeds.length > 0 ? `/breeds` : "/breeds/" + 1}
      key={id}
    >
      <Box
        key={id}
        minW={`${breeds.length > 0 ? "300px" : "200px"}`}
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
        <Image src={url} alt={id} />
        <Box display={`${breeds.length > 0 ? "block" : "none"}`} p="6">
          {breeds.length > 0
            ? breeds.map((breed: Breed) => (
                <DetailsBreed key={id} {...breed}></DetailsBreed>
              ))
            : null}
        </Box>
      </Box>
    </NavLink>
  );
};

const CollectionGrid: FC<DogsProps> = ({ dogs }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  const gap = useBreakpointValue({ base: 3, md: 2, lg: 1, xl: 0 });
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <Center>
      <VStack spacing={gap} w="100%" maxW="1200px" mx="auto" px="6">
        <Grid
          gap={gap}
          mt={20}
          px={20}
          gridAutoFlow="dense"
          templateColumns={[
            `1fr`,
            "1fr",
            `repeat(2, 1fr)`,
            `repeat(auto-fill, minmax(700px, 1fr))`,
            `repeat(auto-fill, minmax(400px, 1fr))`,
          ]}
          templateRows={[
            `repeat(5, 1fr)`,
            "1fr",
            "1fr",
            `repeat(auto-fill, minmax(500px, 1fr))`,
            `repeat(auto-fill, minmax(400px, 1fr))`,
          ]}
        >
          {dogs.map((dog) => (
            <Center key={dog.id} p={4}>
              <Card {...dog} />
            </Center>
          ))}
        </Grid>
        {scrollPosition > 500 && (
          <Link href="/#top">
            <Box
              position="fixed"
              bottom="20px"
              right={["16px", "84px"]}
              zIndex={1}
            >
              <Button>
                <strong>Back to top</strong>
              </Button>
            </Box>
          </Link>
        )}
      </VStack>
    </Center>
  );
};

export default CollectionGrid;
