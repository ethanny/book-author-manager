import { CreateAuthorDto } from "src/authors/dto/create-author.dto";


export const mock_authors: CreateAuthorDto[] = [
  {
    id: 1,
    name: 'Alice Walker',
    booksAuthored: [1, 2],
  },
  {
    id: 2,
    name: 'Mark Twain',
    booksAuthored: [1],
  },
  {
    id: 3,
    name: 'Virginia Woolf',
    booksAuthored: [3],
  },
  {
    id: 4,
    name: 'Toni Morrison',
    booksAuthored: [], // no books yet
  },
  {
    id: 5,
    name: 'Isaac Asimov',
    booksAuthored: [4, 5],
  },
];
  