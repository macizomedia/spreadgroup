import { Center } from "@chakra-ui/react";
import React from "react";

const DetailsPage = (dogs: any) => {
  return (
    <div>
      {dogs.map((dog: any) => (
        <Center key={dog.id} bg="green.100" p={4}>
          <div>
            <img src={dog.url} alt={dog.id} />
            <code>{dog?.breeds}</code>
          </div>
        </Center>
      ))}
    </div>
  );
};

export default DetailsPage;
