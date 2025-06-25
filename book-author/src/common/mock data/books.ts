import { CreateBookDto } from "src/books/dto/create-book.dto";

export type Genre =
  | "Fiction"
  | "Non-fiction"
  | "Fantasy"
  | "Science Fiction"
  | "Mystery"
  | "Romance"
  | "Thriller"
  | "Biography"
  | "Self-help"
  | "Horror";

 export const Genres = [
    "Fiction",
    "Non-fiction",
    "Fantasy",
    "Science Fiction",
    "Mystery",
    "Romance",
    "Thriller",
    "Biography",
    "Self-help",
    "Horror",
  ]

export const mock_books: CreateBookDto[] = [
    {
      id: 1,
      title: 'Voices of the South',
      genres: ["Fiction", "Mystery"],
      publisher: 'Southern Press',
      datePublished: new Date('2018-03-10'),
      authors: [1, 2],
    },
    {
      id: 2,
      title: 'Women and Words',
      genres: ['Non-fiction', 'Self-help'],
      publisher: 'Insight Publishing',
      datePublished: new Date('2020-06-15'),
      authors: [1],
    },
    {
      id: 3,
      title: 'Lighthouse Dreams',
      genres: ['Romance', 'Fiction'],
      publisher: 'Harbor Books',
      datePublished: new Date('2015-02-28'),
      authors: [3],
    },
    {
      id: 4,
      title: 'Future Logic',
      genres: ['Science Fiction', 'Fantasy'],
      publisher: 'Galactic House',
      datePublished: new Date('2021-11-11'),
      authors: [5],
    },
    {
      id: 5,
      title: 'The Robotics Age',
      genres: ['Science Fiction', 'Thriller'],
      publisher: 'NextGen Reads',
      datePublished: new Date('2023-01-20'),
      authors: [5],
    },
  ];