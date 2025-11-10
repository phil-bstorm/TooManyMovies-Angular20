import { RealisatorListing } from './realisator-listing.model';

export interface MovieDetails {
  id: number;
  title: string;
  releaseDate: string;
  genres: string[];
  realisator: RealisatorListing;
}
