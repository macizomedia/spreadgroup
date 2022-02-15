import React from "react";
import { NavLink, useParams } from "react-router-dom";
import { map } from "rxjs";
import { getDogsBreeds } from "../main";

import { motion } from "framer-motion";
import { Box, Flex, Heading, Stack, Text, Image } from "@chakra-ui/react";

const collection = getDogsBreeds("");

const SingleBreed = () => {
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const { id } = useParams();
  const [breed, setBreed] = React.useState<any>({});

  React.useEffect(() => {
    collection
      .pipe(
        map((data) =>
          data
            .filter(
              (breed: { id: number | undefined }) => breed.id === Number(id)
            )
            .pop()
        )
      )
      .subscribe((data) => {
        setBreed(data);
      });
  }, [id]);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ duration: 0.5 }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {breed !== undefined ? (
        <Stack>
          <Box
            as="h1"
            fontSize="5xl"
            fontWeight="bold"
            color="white"
            textAlign="center"
          >
            {breed.name}
          </Box>
          <Box
            as="h2"
            fontSize="3xl"
            fontWeight="bold"
            color="white"
            textAlign="center"
            mt="4"
          >
            {breed.temperament}
          </Box>
          <Flex
            flexWrap="wrap"
            justifyContent="space-between"
            alignItems="center"
            mt="4"
          >
            <Box
              key={breed.id}
              as={NavLink}
              to={`/breeds/${id}`}
              p="2"
              flexBasis="100%"
              flexGrow={1}
              maxW="600px"
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
              {breed.image !== undefined && (
                <Image src={breed.image.url} alt={breed.name} />
              )}
              <Box p="6">
                <Heading as="h3" size="md" mt="2">
                  {breed.name}
                </Heading>
                <Text>{breed.life_span}</Text>
                <Text>{breed.group}</Text>
                <Text>{breed.bred_for}</Text>
              </Box>
            </Box>
          </Flex>
        </Stack>
      ) : (
        <Box>Loading...</Box>
      )}
    </motion.div>
  );
};

export default SingleBreed;
