import { of } from "rxjs";
import { fromFetch } from "rxjs/fetch";
import { switchMap, catchError } from "rxjs/operators";

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

/* 
let name = countries('name')
let capital = countries('capital')
let language = countries('lang')

search$.pipe(
    pluck('target', 'value'),
    filter((searchTerm: string) => searchTerm.length > 2),
    debounceTime(1000),
    distinctUntilChanged(),
    mergeMap((value) => name(value as string)),
    mergeMap((country) => of(...country)),
    tap((data) => console.log(Object.entries(data))),
    mergeScan((acc, { name, capital, currencies, languages, population, timezones }: Country) =>
        of({
            ...acc, ...{
                name,
                capital,
                currencies,
                languages,
                population,
                timezones
            }
        }), {}),
    tap(value => printAll(value as Country[]))
).subscribe()
 */

/* 
const countrie$ = fromFetch('https://restcountries.com/v3.1/all').pipe(switchMap(response => {
    if (response.ok) {
        return response.json();
    } else {
        return of({ error: true, message: `Error ${response.status}` });
    }
}),
    catchError(err => {
        console.error(err);
        return of({ error: true, message: err.message })
    }));
    countrie$.subscribe({
        next: result => result.forEach((element: { name: any; }) => {
            console.log(element.name)
        }),
        complete: () => console.log('done')
    });
    function requestData(url: string, mapFunc: (arg0: any) => Observable) {
        console.log(url)
    const xhr = new XMLHttpRequest();
    return from(new Promise<string>((resolve, reject) => {
        
        // This is generating a random size for a placekitten image
        //   so that we get new cats each request.
        const w = Math.round(Math.random() * 400);
        const h = Math.round(Math.random() * 400);
        const targetUrl = url
        .replace('{w}', w.toString())
        .replace('{h}', h.toString());

        xhr.addEventListener("load", () => {
            resolve(xhr.response);
        });
        xhr.open("GET", targetUrl);
        /* if (requestCategory === 'cats') {
            // Our cats urls return binary payloads
            //  so we need to respond as such.
            xhr.responseType = "arraybuffer";
        }
        xhr.send();
    }))
        .pipe(
            switchMap(async (data) => mapFunc(xhr.response)),
            tap((data) => console.log('Request result: ', data))
            );
        }
/* 
async function searchWiki(term: string | number | boolean) {
    var url = 'http://en.wikipedia.org/w/api.php? action=opensearch&format=json&search=' + encodeURIComponent(term) + '&callback=?';
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    return data
}

countrie$.pipe(map(x => x.map((y: Country) => y)), concatAll(), pluck('capital'))
countrie$.pipe(map(x => x.map((y: Country) => y)), mergeMap((country) => of(...country)), pluck('name', 'common')) */

/* var customCountry = countrie$.pipe(map(arr => arr.map((object: Country) => object)),
    mergeMap((country) => of(...country)),
    mergeScan((acc, { name, capital, currencies }: Country) =>
        of({
            ...acc, ...{
                name,
                capital,
                currencies
            }
        }), {}),
    pluck('name', 'common')) */
