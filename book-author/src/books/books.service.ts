import { ConflictException, ForbiddenException, Injectable, NotFoundException} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { mock_books } from 'src/common/mock data/books';
import { CreateBookAuthorDto } from 'src/book-author/dto/create-book-author.dto';
import { mock_book_authors } from 'src/common/mock data/book-authors';

@Injectable()
export class BooksService {
  private books: CreateBookDto[] = mock_books
  private bookAuthor: CreateBookAuthorDto[] = mock_book_authors
  
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

  // Get books from an author based on a Author ID
  getBooksFromAuthor(bookIds: number[]): CreateBookDto[] {
    return bookIds.map(bookId => this.getBook(bookId));
  }

  // Check if a book exists
  checkBookConflict(id: number) {
    const existingBook = this.books.find((book) => book.id === id);

    if(existingBook){
      throw new ConflictException(`Book(id: ${id}, title: ${existingBook.title}) already exists`);
    }
  }

  // Create a book
  createBook(createBookDto: CreateBookDto): String {
    const { id, title, } = createBookDto

    //Do not allow duplicate books
    this.checkBookConflict(id);
    
    const newBook = {...createBookDto}
    this.books.push(newBook);

    return `Book(id: ${id}, title: ${title}) has been added`;
  }

  // Update a book
  updateBook(id: number, updateBookDto: UpdateBookDto): String {
    const book = this.getBook(id);

    //Preserve the same id after editing
    const updatedBook = {
      ...book, 
      ...updateBookDto,
      id: id
    }

    this.books = this.books.map((book) => book.id === id ? updatedBook : book);

    return `Book(id: ${book.id}, title: ${book.title}) has been updated`;
  }

  // Check if an book has authors
  checkAuthorHasBooks(id: number) {
    const book = this.getBook(id);
    const authors = this.bookAuthor.filter((bookAuthor) => bookAuthor.bookId === id);
    
    if(authors.length > 0){
      throw new ForbiddenException(`Author(id: ${id}, name: ${book.title}) has authors and cannot be deleted`);
    }
  }

  // Delete a book
  deleteBook(id: number): String {
    const book = this.getBook(id);

    //Do not allow deletion if the book has authors
    this.checkAuthorHasBooks(id);

    this.books = this.books.filter((book) => book.id !== id);

    return `Book(id: ${book.id}, title: ${book.title}) has been removed`;
  }
}
