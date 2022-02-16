import React from "react";
import { getDogsBreeds } from "../main";
import { useObservable } from "observable-hooks";

export const useDogsCollection = () => {
  const [collection, setCollection] = React.useState([]);
  const stream = React.useCallback(() => getDogsBreeds(""), []);
  const dogs = useObservable(stream, []);

  React.useEffect(() => {
    dogs.subscribe(setCollection);
    return () => {
      setCollection([]);
    };
  }, [dogs]);

  return collection;
};
