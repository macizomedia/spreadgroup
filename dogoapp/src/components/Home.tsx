import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
} from "@chakra-ui/react";
import pugImagen from "assets/img/Pug.jpg";
import dogsImage from "assets/img/dogs.jpg";
import { NavLink } from "react-router-dom";
import HomeData from 'hooks/useGrapQuery'

export default function Home() {
  HomeData.then(data => console.log(data))
  return (
    <Center gap={5}>
      <NavLink to="/breeds">
        <Box
          minW={["100%", "100%", "100%", "100%", "100%"]}
          minH={["100%", "100%", "100%", "100%", "100%"]}
          bg={useColorModeValue("white", "gray.900")}
          boxShadow={"2xl"}
          rounded={"md"}
          p={6}
          overflow={"hidden"}
          backgroundImage={pugImagen}
          backgroundPosition={"center"}
          backgroundSize={"cover"}
          _hover={{
            boxShadow: "2xl",
            opacity: 0.8,
            borderWidth: "1px",
            borderColor: "teal.500",
            cursor: "pointer",
            transform: "scale(0.95)",
            transition: "all 0.2s",
          }}
        >
          <Stack h="45vh">
            <Heading
              color={useColorModeValue("gray.700", "white")}
              fontSize={"2xl"}
              fontFamily={"body"}
            >
              Search Dogs by Breed
            </Heading>
            <Text color={"gray.500"}>
              More than 100 breeds of dogs available
            </Text>
          </Stack>
          {/* <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
            <Avatar
              src={"https://avatars0.githubusercontent.com/u/1164541?v=4"}
            />
            <Stack direction={"column"} spacing={0} fontSize={"sm"}>
              <Text fontWeight={600}>Achim Rolle</Text>
              <Text color={"gray.500"}>Feb 08, 2021 · 6min read</Text>
            </Stack>
          </Stack> */}
        </Box>
      </NavLink>
      <NavLink to="/dogs">
        <Box
          minW={["20%", "40%", "60%", "80%", "100%"]}
          minH={["20%", "40%", "60%", "80%", "100%"]}
          bg={useColorModeValue("white", "gray.900")}
          boxShadow={"2xl"}
          rounded={"md"}
          p={6}
          overflow={"hidden"}
          backgroundImage={dogsImage}
          backgroundPosition={"center"}
          backgroundSize={"cover"}
          _hover={{
            boxShadow: "2xl",
            opacity: 0.8,
            borderWidth: "1px",
            borderColor: "teal.500",
            cursor: "pointer",
            transform: "scale(0.95)",
            transition: "all 0.2s",
          }}
        >
          <Stack h="45vh">
            <Heading
              color={useColorModeValue("gray.700", "black")}
              fontSize={"2xl"}
              fontFamily={"body"}
            >
              Just look at Dog pictures please
            </Heading>
            <Text fontWeight={600} color={"white"}>
              Images added everyday
            </Text>
          </Stack>
        </Box>
      </NavLink>
    </Center>
  );
}
