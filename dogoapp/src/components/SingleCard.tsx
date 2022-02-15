import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDogsBreeds } from "../main";

export const SingleCard = () => {
  const { breed } = useParams();
  const [dog, setDog] = React.useState<any>();
  const breedData = getDogsBreeds(
    `search?q=${breed!}`
  );
  useEffect(() => {
    breedData.subscribe((data) => {
      setDog(data);
    });

    return () => {
      setDog(undefined);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>{`From params got${JSON.stringify(dog)} `}</div>;
};
