import { Box } from "@chakra-ui/react";
import React from "react";
import { tap, pluck, map } from "rxjs";
import { image$ } from "../main";

export const useImage = (breed: string) => {
  const [images, setImages] = React.useState<any>([]);
  React.useEffect(() => {
    image$(`dogs, ${breed}`, "black")
      .pipe(
        tap((images) => console.log(images)),
        pluck("results"),
        map((images) => images.map((image: { urls: any }) => image.urls)),
        map((formats) => formats.map((image: any) => image.raw))
      )
      .subscribe((images) => setImages(images));
  }, [breed]);
  return images;
};

const BackgroudComp = ({ children }: { children: React.ReactNode }) => {
  const bg = useImage("beagle");
  return (
    <Box
      backgroundImage={bg}
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundAttachment={["fixed", "fixed"]}
      height="100vh"
      width="100vw"
    >
      {children}
    </Box>
  );
};

export default BackgroudComp;
