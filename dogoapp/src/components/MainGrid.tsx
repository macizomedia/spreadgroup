import React, { FC, ChangeEvent, useEffect, useState } from "react";
import { Center, Select, Text, Button, Stack } from "@chakra-ui/react";
import {
  Pagination,
  usePagination,
  PaginationPage,
  PaginationNext,
  PaginationPrevious,
  PaginationPageGroup,
  PaginationContainer,
  PaginationSeparator,
} from "@ajna/pagination";

import { Dog } from "types";
import DetailsPage from "./CollectionGrid";

import { getDogs } from "main";

const queryDogs = async (page: number, limit: number) => {
  const dogs = getDogs(`?limit=${limit}&page=${page}&order=Desc`);
  return dogs;
};

/* const fetchDogs = async (pageSize: number, offset: number): Promise<any> => {
  return await fetch(
    `https://api.thedogapi.com/v1/images/search?limit=${pageSize}&page=${offset}&order=Desc`,
    {
      method: "get",
      headers: new Headers({
        "x-api-key": "17460dc6-8492-40f2-abd5-62c692647c6c",
      }),
    }
  ).then(async (res) => await res.json());
}; */

const MainGrid: FC = () => {
  // states
  const [dogsTotal, setDogsTotal] = useState<number | undefined>(undefined);
  const [dogs, setDogs] = useState<Dog[]>([]);

  // constants
  const outerLimit = 2;
  const innerLimit = 2;

  // pagination hook
  const {
    pages,
    pagesCount,
    offset,
    currentPage,
    setCurrentPage,
    setIsDisabled,
    isDisabled,
    pageSize,
    setPageSize,
  } = usePagination({
    total: dogsTotal,
    limits: {
      outer: outerLimit,
      inner: innerLimit,
    },
    initialState: {
      pageSize: 10,
      isDisabled: false,
      currentPage: 1,
    },
  });

  // fetch dogs
  // effects
  useEffect(() => {
    /* fetchDogs(pageSize, offset)
      .then((dogs) => {
        console.log(dogs);
        setDogsTotal(100);
        setDogs(dogs);
      })
      .catch((error) => console.error("App =>", error)); */
    if (currentPage === 1 || pageSize) {
      queryDogs(currentPage, pageSize).then((data) => {
        data.subscribe((dogs) => {
          console.log(dogs);
          setDogsTotal(100);
          setDogs(dogs);
        });
      });
    }
  }, [currentPage, pageSize, offset]);

  // handlers
  const handlePageChange = (nextPage: number): void => {
    // -> request new data using the page number
    setCurrentPage(nextPage);
    queryDogs(nextPage, pageSize).then((dogs) =>
      dogs.subscribe((dogs) => {
        setDogsTotal(100);
        setDogs(dogs);
      })
    );
  };

  const handlePageSizeChange = (
    event: ChangeEvent<HTMLSelectElement>
  ): void => {
    const pageSize = Number(event.target.value);

    setPageSize(pageSize);
  };

  const handleDisableClick = (): void => {
    setIsDisabled((oldState) => !oldState);
  };

  return (
    <Stack maxW={"90vw"}>
      <Pagination
        pagesCount={pagesCount}
        currentPage={currentPage}
        isDisabled={isDisabled}
        onPageChange={handlePageChange}
      >
        <PaginationContainer
          align="center"
          justify="space-between"
          p={4}
          w="full"
        >
          <PaginationPrevious
            _hover={{
              bg: "yellow.400",
            }}
            bg="yellow.300"
            onClick={() => console.warn("I'm clicking the previous")}
          >
            <Text>Previous</Text>
          </PaginationPrevious>
          <PaginationPageGroup
            isInline
            align="center"
            separator={
              <PaginationSeparator
                isDisabled
                onClick={() => console.warn("I'm clicking the separator")}
                bg="blue.300"
                fontSize="sm"
                w={7}
                jumpSize={11}
              />
            }
          >
            {pages.map((page: number) => (
              <PaginationPage
                w={7}
                bg="red.300"
                key={`pagination_page_${page}`}
                page={page}
                onClick={() => console.warn("Im clicking the page")}
                fontSize="sm"
                _hover={{
                  bg: "green.300",
                }}
                _current={{
                  bg: "green.300",
                  fontSize: "sm",
                  w: 7,
                }}
              />
            ))}
          </PaginationPageGroup>
          <PaginationNext
            _hover={{
              bg: "yellow.400",
            }}
            bg="yellow.300"
            onClick={() => console.warn("I'm clicking the next")}
          >
            <Text>Next</Text>
          </PaginationNext>
        </PaginationContainer>
      </Pagination>
      <Center w="full">
        <Button
          _hover={{
            bg: "purple.400",
          }}
          bg="purple.300"
          onClick={handleDisableClick}
        >
          Disable ON / OFF
        </Button>
        <Select ml={3} onChange={handlePageSizeChange} w={40}>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </Select>
      </Center>

      {dogs ? <DetailsPage dogs={dogs}></DetailsPage> : <h2>Loading...</h2>}
    </Stack>
  );
};

export default MainGrid;
