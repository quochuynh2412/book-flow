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

export interface User {
  id: string;
  name: string;
  score: number;
}
