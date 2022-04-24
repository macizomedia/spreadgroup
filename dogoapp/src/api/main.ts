import { of } from "rxjs";
import { fromFetch } from "rxjs/fetch";
import { createApi } from "unsplash-js";
import { switchMap, catchError } from "rxjs/operators";

const unsplash = createApi({
  accessKey: "7Ia8dL8h1dD2yr6pR_d49RHaFO-KxM-xyMnYaOP_-VM",
});
const API = "https://api.thedogapi.com/v1/";

const dogs = (endpoint: string) => (query: string) =>
  fromFetch(API + endpoint + "/" + query).pipe(
    switchMap((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return of({ error: true, message: `Error ${response.status}` });
      }
    }),
    catchError((err) => {
      console.error(err);
      return of({ error: true, message: err.message });
    })
  );

export const getDogs = dogs("images/search");
export const getDogsBreeds = dogs("breeds");

export const fetchImages = async (name: any) => {
  const result = await unsplash.search.getPhotos({
    query: name,
    page: 1,
    perPage: 6,
  });
  const firstPhoto = result.response!.results[0];

  return firstPhoto;
};

export const searchImg = (query: any, color: any) => {
  unsplash.search
    .getPhotos({
      query: query,
      page: 1,
      perPage: 10,
      color: color,
      orientation: "portrait",
    })
    .then((result) => {
      switch (result.type) {
        case "error":
          console.log("error occurred: ", result.errors[0]);
          break;
        case "success":
          const photo = result.response;
          console.log(photo);
          return photo;

        default:
          break;
      }
    });
};

export const image$ = (query: any, color: any) => {
  return fromFetch(
    `https://api.unsplash.com/search/photos?client_id=7Ia8dL8h1dD2yr6pR_d49RHaFO-KxM-xyMnYaOP_-VM&query=${query}&color=${color}&orientation=portrait
    `
  ).pipe(
    switchMap((response) => response.json()),
    catchError((err) => {
      console.error(err);
      return of({ error: true, message: err.message });
    })
  );
};
