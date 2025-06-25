import { CreateBookAuthorDto } from "src/book-author/dto/create-book-author.dto";

export const mock_book_authors: CreateBookAuthorDto[] = [
  {
    bookAuthorId: 1,
    bookId: 1, // Voices of the South
    authorId: 1, // Alice Walker
  },
  {
    bookAuthorId: 2,
    bookId: 1, // Voices of the South
    authorId: 2, // Mark Twain
  },
  {
    bookAuthorId: 3,
    bookId: 2, // Women and Words
    authorId: 1, // Alice Walker
  },
  {
    bookAuthorId: 4,
    bookId: 3, // Lighthouse Dreams
    authorId: 3, // Virginia Woolf
  },
  {
    bookAuthorId: 5,
    bookId: 4, // Future Logic
    authorId: 5, // Isaac Asimov
  },
  {
    bookAuthorId: 6,
    bookId: 5, // The Robotics Age
    authorId: 5, // Isaac Asimov
  },
]; 