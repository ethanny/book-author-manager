import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookAuthorDto } from './dto/create-book-author.dto';
import { UpdateBookAuthorDto } from './dto/update-book-author.dto';
import { mock_book_authors } from 'src/common/mock data/book-authors';
import { BooksService } from 'src/books/books.service';
import { AuthorsService } from 'src/authors/authors.service';
import { CreateAuthorDto } from 'src/authors/dto/create-author.dto';
import { CreateBookDto } from 'src/books/dto/create-book.dto';

@Injectable()
export class BookAuthorService {
  constructor(
    private readonly booksService: BooksService, 
    private readonly authorsService: AuthorsService
  ) {}
  
  private bookAuthors: CreateBookAuthorDto[] = mock_book_authors;

  // Get all book author relationships
  getAllBookAuthorRelationships(): CreateBookAuthorDto[] {
    return this.bookAuthors;
  }

  // Get a book author relationship by id
  getBookAuthorRelationship(id: number): CreateBookAuthorDto {
    const bookAuthor = this.bookAuthors.find((author) => author.bookAuthorId === id);

    if (!bookAuthor) {
      throw new NotFoundException(`BookAuthor(id: ${id}) not found`);
    }

    return bookAuthor;
  }

  // Get all book ids from an author
  getBookIdsFromAuthor(authorId: number): number[] {
    // Validate author exists
    this.authorsService.getAuthor(authorId);
    
    const bookIds = this.bookAuthors
      .filter((bookAuthor) => bookAuthor.authorId === authorId)
      .map((bookAuthor) => bookAuthor.bookId);

    return bookIds
  }

  //Get all books from an author
  getBooksFromAuthor(authorId: number): CreateBookDto[] {
    const bookIds = this.getBookIdsFromAuthor(authorId);
    const booksAuthored = this.booksService.getBooksFromAuthor(bookIds);

    return booksAuthored
  }

  // Get all author ids from a book
  getAuthorIdsFromBook(bookId: number): number[] {
    // Validate book exists
    this.booksService.getBook(bookId);
    
    const authorIds = this.bookAuthors
      .filter((bookAuthor) => bookAuthor.bookId === bookId)
      .map((bookAuthor) => bookAuthor.authorId);

    return authorIds
  }

  // Get all authors from a book
  getAuthorsFromBook(bookId: number): CreateAuthorDto[] {
    const authorIds = this.getAuthorIdsFromBook(bookId);
    const bookAuthors = this.authorsService.getAuthorsFromBook(authorIds);

    return bookAuthors
  }

  // Validates that both book and author exist
  validateBookAndAuthorExist(bookId: number, authorId: number): { book: CreateBookDto; author: CreateAuthorDto } {
    const book = this.booksService.getBook(bookId);
    const author = this.authorsService.getAuthor(authorId);

    return { book, author };
  }

  // Checks if a book author ID already exists
  checkExistingBookAuthorId(bookAuthorId: number): void {
    const existingId = this.bookAuthors.find((bookAuthor) => bookAuthor.bookAuthorId === bookAuthorId);

    if (existingId) {
      throw new ConflictException(`BookAuthor(id: ${bookAuthorId}) already exists`);
    }
  }

  // Checks if a book-author relationship already exists
  private checkRelationshipExists(bookId: number, authorId: number): void {
    const existingRelationship = this.bookAuthors.some((bookAuthor) => 
      bookAuthor.bookId === bookId && 
      bookAuthor.authorId === authorId
    );

    if (existingRelationship) {
      throw new ConflictException(`Book(id: ${bookId}) already has author(id: ${authorId})`);
    }
  }

  // Creates a book-author relationship
  addAuthorToBook(createBookAuthorDto: CreateBookAuthorDto): string {
    const { bookAuthorId, bookId, authorId } = createBookAuthorDto;

    // Validate entities exist
    const { book, author } = this.validateBookAndAuthorExist(bookId, authorId);

    // Validate no duplicates
    this.checkExistingBookAuthorId(bookAuthorId);
    this.checkRelationshipExists(bookId, authorId);
    
    const newBookAuthor = { ...createBookAuthorDto };
    this.bookAuthors.push(newBookAuthor);

    return `Author(id: ${authorId}, name: ${author.name}) has been added to book(id: ${bookId}, title: ${book.title})`;
  }

  // Update a book-author relationship
  updateBookAuthorRelationship(bookAuthorId: number, updateBookAuthorDto: UpdateBookAuthorDto): string {
    const existingBookAuthor = this.getBookAuthorRelationship(bookAuthorId);

    // Create updated relationship while preserving the ID
    const updatedBookAuthor = {
      ...existingBookAuthor, 
      ...updateBookAuthorDto,
      bookAuthorId: bookAuthorId,
    };

    // Validate entities exist
    const { book, author } = this.validateBookAndAuthorExist(updatedBookAuthor.bookId, updatedBookAuthor.authorId);

    // Check for duplicate relationships (excluding current record)
    this.checkRelationshipExists(updatedBookAuthor.bookId, updatedBookAuthor.authorId);

    // Update the relationship
    this.bookAuthors = this.bookAuthors.map((bookAuthor) => 
      bookAuthor.bookAuthorId === bookAuthorId ? updatedBookAuthor : bookAuthor
    );

    return `BookAuthor(id: ${bookAuthorId}) has been updated to Book(id: ${book.id}, title: ${book.title}) - Author(id: ${author.id}, name: ${author.name})`;
  }

  // Removes a book-author relationship by book and author IDs
  removeAuthorFromBook(bookId: number, authorId: number): string {
    // Validate entities exist
    const { book, author } = this.validateBookAndAuthorExist(bookId, authorId);

    const relationshipExists = this.bookAuthors.some((bookAuthor) => 
      bookAuthor.bookId === bookId && bookAuthor.authorId === authorId
    );

    if (!relationshipExists) {
      throw new NotFoundException(`Book(id: ${bookId}) does not have author(id: ${authorId})`);
    }

    this.bookAuthors = this.bookAuthors.filter((bookAuthor) => 
      !(bookAuthor.bookId === bookId && bookAuthor.authorId === authorId)
    );

    return `Author(id: ${authorId}, name: ${author.name}) has been removed from book(id: ${bookId}, title: ${book.title})`;
  }

  // Removes a book-author relationship by relationship ID
  removeBookAuthorRelationship(bookAuthorId: number): string {
    const bookAuthor = this.getBookAuthorRelationship(bookAuthorId);

    this.bookAuthors = this.bookAuthors.filter((ba) => ba.bookAuthorId !== bookAuthorId);

    return `BookAuthor(id: ${bookAuthorId}) has been removed`;
  }
}
