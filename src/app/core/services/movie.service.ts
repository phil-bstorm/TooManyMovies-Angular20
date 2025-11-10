import { Injectable } from '@angular/core';
import { MovieListing } from '@core/models/movie-listing.model';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  getMovies(/* TODO pagination */): MovieListing[] {
    // TODO CALL API

    return [
      {
        id: 1,
        title: 'Inception',
        releaseDate: '2010-07-16',
        genres: ['Science Fiction', 'Thriller'],
        // @ts-ignore
        realisator: {
          id: 1,
          name: 'Christopher Nolan',
          birthDate: '1970-07-30',
        },
      },
      {
        id: 2,
        title: 'Interstellar',
        releaseDate: '2014-11-07',
        genres: ['Science Fiction', 'Drama'],
        // @ts-ignore
        realisator: {
          id: 1,
          name: 'Christopher Nolan',
          birthDate: '1970-07-30',
        },
      },
      {
        id: 3,
        title: 'Jurassic Park',
        releaseDate: '1993-06-11',
        genres: ['Adventure', 'Science Fiction'],
        // @ts-ignore
        realisator: {
          id: 2,
          name: 'Steven Spielberg',
          birthDate: '1946-12-18',
        },
      },
      {
        id: 4,
        title: "Schindler's List",
        releaseDate: '1993-12-15',
        genres: ['Drama', 'History'],
        // @ts-ignore
        realisator: {
          id: 2,
          name: 'Steven Spielberg',
          birthDate: '1946-12-18',
        },
      },
      {
        id: 5,
        title: 'Pulp Fiction',
        releaseDate: '1994-10-14',
        genres: ['Crime', 'Drama'],
        // @ts-ignore
        realisator: {
          id: 3,
          name: 'Quentin Tarantino',
          birthDate: '1963-03-27',
        },
      },
      {
        id: 6,
        title: 'Inglourious Basterds',
        releaseDate: '2009-08-21',
        genres: ['War', 'Adventure'],
        // @ts-ignore
        realisator: {
          id: 3,
          name: 'Quentin Tarantino',
          birthDate: '1963-03-27',
        },
      },
      {
        id: 7,
        title: 'The Wolf of Wall Street',
        releaseDate: '2013-12-25',
        genres: ['Comedy', 'Drama'],
        // @ts-ignore
        realisator: {
          id: 4,
          name: 'Martin Scorsese',
          birthDate: '1942-11-17',
        },
      },
      {
        id: 8,
        title: 'Taxi Driver',
        releaseDate: '1976-02-08',
        genres: ['Drama', 'Crime'],
        // @ts-ignore
        realisator: {
          id: 4,
          name: 'Martin Scorsese',
          birthDate: '1942-11-17',
        },
      },
      {
        id: 9,
        title: 'Avatar',
        releaseDate: '2009-12-18',
        genres: ['Science Fiction', 'Adventure'],
        // @ts-ignore
        realisator: {
          id: 5,
          name: 'James Cameron',
          birthDate: '1954-08-16',
        },
      },
      {
        id: 10,
        title: 'Titanic',
        releaseDate: '1997-12-19',
        genres: ['Drama', 'Romance'],
        // @ts-ignore
        realisator: {
          id: 5,
          name: 'James Cameron',
          birthDate: '1954-08-16',
        },
      },
      {
        id: 11,
        title: 'Gladiator',
        releaseDate: '2000-05-05',
        genres: ['Action', 'Drama'],
        // @ts-ignore
        realisator: {
          id: 6,
          name: 'Ridley Scott',
          birthDate: '1937-11-30',
        },
      },
      {
        id: 12,
        title: 'Blade Runner',
        releaseDate: '1982-06-25',
        genres: ['Science Fiction', 'Noir'],
        // @ts-ignore
        realisator: {
          id: 6,
          name: 'Ridley Scott',
          birthDate: '1937-11-30',
        },
      },
      {
        id: 13,
        title: 'The Lord of the Rings: The Fellowship of the Ring',
        releaseDate: '2001-12-19',
        genres: ['Fantasy', 'Adventure'],
        // @ts-ignore
        realisator: {
          id: 7,
          name: 'Peter Jackson',
          birthDate: '1961-10-31',
        },
      },
      {
        id: 14,
        title: 'Barbie',
        releaseDate: '2023-07-21',
        genres: ['Comedy', 'Fantasy'],
        // @ts-ignore
        realisator: {
          id: 8,
          name: 'Greta Gerwig',
          birthDate: '1983-08-04',
        },
      },
      {
        id: 15,
        title: 'Dune: Part Two',
        releaseDate: '2024-03-01',
        genres: ['Science Fiction', 'Adventure'],
        // @ts-ignore
        realisator: {
          id: 9,
          name: 'Denis Villeneuve',
          birthDate: '1967-10-03',
        },
      },
    ];
  }
}
