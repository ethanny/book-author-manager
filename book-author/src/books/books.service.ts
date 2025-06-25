import { ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { mock_books } from 'src/common/mock data/books';

@Injectable()
export class BooksService {
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

  // Delete a book
  deleteBook(id: number): String {
    const book = this.getBook(id);

    this.books = this.books.filter((book) => book.id !== id);

    return `Book(id: ${book.id}, title: ${book.title}) has been removed and all authors have been removed from this book`;
  }
}
