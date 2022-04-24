import { useObservable } from "observable-hooks";
import React, { useState } from "react";
import { getDogsBreeds } from "../api/main";

interface Breed {
  weight: Weight;
  height: Weight;
  id: number;
  name: string;
  bred_for: string;
  breed_group: string;
  life_span: string;
  temperament: string;
  origin: string;
  reference_image_id: string;
  image: Image;
}

interface Image {
  id: string;
  width: number;
  height: number;
  url: string;
}

interface Weight {
  imperial: string;
  metric: string;
}

export const useDogQuery = ({
  query,
}: {
  query: string;
}): Breed | undefined => {
  const [dog, setDog] = useState<Breed>();

  const result$ = useObservable(() => getDogsBreeds(query), []);

  React.useEffect(() => {
    result$.subscribe(setDog);
    return () => {
      setDog(undefined);
    };
  }, [result$]);

  return dog ? dog : undefined;
};
