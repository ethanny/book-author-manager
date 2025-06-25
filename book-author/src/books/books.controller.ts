import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  //http://localhost:3000/books
  getAuthors() {
    return this.booksService.getAllBooks();
  }

  //http://localhost:3000/books/:id
  @Get(':id')
  getOneAuthor(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.getBook(id);
  }

  //http://localhost:3000/books
  @Post()
  create(@Body(new ValidationPipe()) createBookDto: CreateBookDto) {
    return this.booksService.createBook(createBookDto);
  }

  //Add author with authorId to book with bookId
  //http://localhost:3000/books/:bookId/authors/:authorId
  @Post(':bookId/authors/:authorId')
  addAuthorToBook(@Param('bookId', ParseIntPipe) bookId: number, @Param('authorId', ParseIntPipe) authorId: number) {
    return this.booksService.addAuthorToBook(bookId, authorId)
  }

  //http://localhost:3000/books/:id
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body(new ValidationPipe()) updateBookDto: UpdateBookDto) {
    return this.booksService.updateBook(id, updateBookDto);
  }

  //http://localhost:3000/books/:id
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.deleteBook(id);
  }

  //Remove author with authorId from book with bookId
  //http://localhost:3000/books/:bookId/authors/:authorId
  @Delete(':bookId/authors/:authorId')
  removeAuthorFromBook(@Param('bookId', ParseIntPipe) bookId: number, @Param('authorId', ParseIntPipe) authorId: number) {
    return this.booksService.removeAuthorFromBook(bookId, authorId)
  }
}
