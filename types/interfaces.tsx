import exp from "constants";

export interface Genre {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export interface Author {
  id: string;
  description: string;
  name: string;
}

export interface Book {
  id: string;
  description: string;
  authors: Author[];
  genres: Genre[];
  imageUrl: string;
  title: string;
}

export interface BookList {
  id: string;
  books: any[];
  name: string;
  ownerId: string;
}

export interface OriginalGenre {
  objectID: string; imageID: string; name: string; description: string; index: number; path: string; lastmodified: number;
}

export interface OriginalBook {
  objectID: string; genreID: string[]; imageID: string; author: string[]; genre: string[]; index: number; authorID: string[]; title: string; path: string; lastmodified: number;
}
export interface User {
  id: string;
  name: string;
  score: number;
}
