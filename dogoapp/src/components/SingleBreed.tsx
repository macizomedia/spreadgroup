import React from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDogsCollection } from "../hooks/useDogsCollection";
import { motion } from "framer-motion";
import {
  Box,
  Heading,
  Stack,
  Text,
  Image,
  Center,
  Flex,
  Badge,
} from "@chakra-ui/react";

const SingleBreed = () => {
  const { id } = useParams();
  const collection = useDogsCollection();
  const [breed, setBreed] = React.useState<any>({});

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  React.useEffect(() => {
    const selected = collection
      .filter((breed: { id: number | undefined }) => breed.id === Number(id))
      .pop();
    setBreed(selected);
  }, [collection, id]);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ duration: 0.5 }}
      style={{
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
          <hr></hr>
          <Flex maxW="600px" flexWrap="wrap">
            {breed.temperament &&
              breed.temperament.split(",").map((item: string) => (
                <Badge
                  borderRadius="5px"
                  ml="1"
                  p="0.3rem"
                  m="0.5rem"
                  fontSize="0.8em"
                  colorScheme="blue"
                  key={item}
                >
                  {item}
                </Badge>
              ))}
          </Flex>

          <Center>
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
                borderWidth: "1px",
                borderColor: "teal.500",
                cursor: "pointer",
                transform: "scale(0.95)",
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
                <Text>{breed.group}</Text>
                <Text>
                  <strong>Life Span:</strong>
                  {` ${breed.life_span}`}
                </Text>
                <Text>
                  <strong>Weight:</strong>
                  {` ${breed.weight ? breed.weight.metric + " kg" : "no data"}`}
                </Text>
                <Text>
                  <strong>Heigth:</strong>
                  {` ${breed.height ? breed.height.metric + " cm" : null}`}
                </Text>
              </Box>
            </Box>
          </Center>
        </Stack>
      ) : (
        <Box>Loading...</Box>
      )}
    </motion.div>
  );
};

export default SingleBreed;
