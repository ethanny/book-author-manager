import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookAuthorDto } from './dto/create-book-author.dto';
import { UpdateBookAuthorDto } from './dto/update-book-author.dto';
import { mock_book_authors } from 'src/common/mock data/book-authors';
import { BooksService } from 'src/books/books.service';
import { AuthorsService } from 'src/authors/authors.service';
import { CreateAuthorDto } from 'src/authors/dto/create-author.dto';
import { CreateBookDto } from 'src/books/dto/create-book.dto';

@Injectable()
export class BookAuthorService {
  constructor(private readonly booksService: BooksService, private readonly authorsService: AuthorsService) {}
  private bookAuthor: CreateBookAuthorDto[] = mock_book_authors

  getAllBookAuthorRelationships(): CreateBookAuthorDto[] {
    return this.bookAuthor;
  }

  getBookAuthorRelationship(id: number): CreateBookAuthorDto {
    const author = this.bookAuthor.find((author) => author.bookAuthorId === id);

    if (!author) {
      throw new NotFoundException(`BookAuthor(id: ${id}) not found`);
    }
    return author;
  }

  getBookIdsFromAuthor(authorId: number): number[] {
    const author = this.authorsService.getAuthor(authorId);
    
    const books = this.bookAuthor
      .filter((bookAuthor) => bookAuthor.authorId === authorId)
      .map((bookAuthor) => bookAuthor.bookId);

    return books
  }

  getBooksFromAuthor(bookId: number): CreateBookDto[] {
    const authorIds = this.getAuthorIdsFromBook(bookId);
    const books = this.booksService.getBooksFromAuthor(authorIds)
    
    return books
  }

  getAuthorIdsFromBook(bookId: number): number[] {
    const book = this.booksService.getBook(bookId);
    
    const authors = this.bookAuthor
      .filter((bookAuthor) => bookAuthor.bookId === bookId)
      .map((bookAuthor) => bookAuthor.authorId);
    
      return authors
  }

  getAuthorsFromBook(authorId: number): CreateAuthorDto[] {
    const bookIds = this.getBookIdsFromAuthor(authorId);
    const authors = this.authorsService.getAuthorsFromBook(bookIds)
    
    return authors
  }

  addAuthorToBook(createBookAuthorDto: CreateBookAuthorDto): String {
    const {bookId, authorId} = createBookAuthorDto

    const book = this.booksService.getBook(bookId);
    const author = this.authorsService.getAuthor(authorId);

    //Do not allow duplicate authors in a book
    // this.checkAuthorConflictInBook(book, author);
    
    const NewBookAuthor = {...createBookAuthorDto}
    this.bookAuthor.push(NewBookAuthor);

    return `Author(id: ${authorId}, name: ${author.name}) has been added to book(id: ${bookId}, title: ${book.title})`;
  }

  removeAuthorFromBook(bookId: number, authorId: number): String {
    const book = this.booksService.getBook(bookId);
    const author = this.authorsService.getAuthor(authorId);

    this.bookAuthor = this.bookAuthor.filter((bookAuthor) => bookAuthor.bookId !== bookId && bookAuthor.authorId !== authorId);

    return `Author(id: ${authorId}, name: ${author.name}) has been removed from book(id: ${bookId}, title: ${book.title})`;
  }

  update(id: number, updateBookAuthorDto: UpdateBookAuthorDto) {
    return `This action updates a #${id} bookAuthor`;
  }
}
