import { ConflictException, Injectable, NotFoundException, Inject, forwardRef } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { mock_books } from 'src/common/mock data/books';
import { CreateAuthorDto } from 'src/authors/dto/create-author.dto';
import { AuthorsService } from 'src/authors/authors.service';

@Injectable()
export class BooksService {
  constructor(
    @Inject(forwardRef(() => AuthorsService))
    private readonly authorsService: AuthorsService
  ) {}
  private books: CreateBookDto[] = mock_books
  
  // Get all books
  getAllBooks(): CreateBookDto[] {
    return this.books;
  }

  // Get a book by id
  getBook(id: number): CreateBookDto {
    const book = this.books.find((book) => book.id === id);

    if (!book) {
      throw new NotFoundException(`Book(id: ${id}) not found`);
    }

    return book;
  }

  // Check if a book exists
  checkBookConflict(id: number) {
    const existingBook = this.books.find((book) => book.id === id);

    if(existingBook){
      throw new ConflictException(`Book(id: ${id}, title: ${existingBook.title}) already exists`);
    }
  }

  // Check if an author already exists in a book
  checkAuthorConflictInBook(book: CreateBookDto, author: CreateAuthorDto) {
    if (book.authors.includes(author.id)) {
      throw new ConflictException(`Author(id: ${author.id}, name: ${author.name}) already exists in book(id: ${book.id}, title: ${book.title})`);
    }
  }

  //check if author exists in book
  checkAuthorExistsInBook(book: CreateBookDto, authorId: number) {
    if (!book.authors.includes(authorId)) {
      throw new NotFoundException(`Author(id: ${authorId}) not found in book(id: ${book.id}, title: ${book.title})`);
    }
  }

  //Check if books assigned to author exist
  checkBookAuthorsExist(bookAuthors: number[] | undefined) {
    if(bookAuthors){
      bookAuthors.forEach(authorId => {
        this.authorsService.getAuthor(authorId);
      });
    }
  }

  // Create a book
  createBook(createBookDto: CreateBookDto): String {
    const { id, title, authors } = createBookDto

    //Do not allow duplicate books
    this.checkBookConflict(id);
    //Check if authors assigned to book exist
    this.checkBookAuthorsExist(authors);
    
    const newBook = {...createBookDto}
    this.books.push(newBook);

    return `Book(id: ${id}, title: ${title}) has been added`;
  }

  addAuthorToBook(bookId: number, authorId: number): String {
    const book = this.getBook(bookId);
    const author = this.authorsService.getAuthor(authorId);

    //Do not allow duplicate authors in a book
    this.checkAuthorConflictInBook(book, author);
    
    book.authors.push(authorId);
    author.booksAuthored.push(bookId);

    return `Author(id: ${authorId}, name: ${author.name}) has been added to book(id: ${bookId}, title: ${book.title})`;
  }

  // Update a book
  updateBook(id: number, updateBookDto: UpdateBookDto): String {
    const book = this.getBook(id);

    //Check if authors assigned to book exist
    this.checkBookAuthorsExist(updateBookDto.authors);

    //Preserve the same id after editing
    const updatedBook = {
      ...book, 
      ...updateBookDto,
      id: id
    }

    this.books = this.books.map((book) => book.id === id ? updatedBook : book);

    return `Book(id: ${book.id}, title: ${book.title}) has been updated`;
  }

  // Delete a book
  deleteBook(id: number): String {
    const book = this.getBook(id);

    //Remove book and remove any references to book from authors
    this.books = this.books.filter((book) => book.id !== id);
    this.authorsService.removeBookFromAllAuthors(id);

    return `Book(id: ${book.id}, title: ${book.title}) has been removed and all authors have been removed from this book`;
  }

  // Remove an author from a book
  removeAuthorFromBook(bookId: number, authorId: number): String {
    const book = this.getBook(bookId);
    const author = this.authorsService.getAuthor(authorId);

    //Check if author exists in book
    this.checkAuthorExistsInBook(book, authorId);

    book.authors = book.authors.filter((id) => id != authorId);
    author.booksAuthored = author.booksAuthored.filter((id) => id != bookId);

    return `Author(id: ${authorId}, name: ${author.name}) has been removed from book(id: ${bookId}, title: ${book.title})`;
  }

  // Remove author from all books
  removeAuthorFromAllBooks(authorId: number) {
    this.books = this.books.map((book) => ({
      ...book,
      authors: book.authors.filter((id) => id != authorId) ?? [],
    }));
  }
}
