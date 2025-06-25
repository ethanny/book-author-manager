import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { BookAuthorService } from './book-author.service';
import { CreateBookAuthorDto } from './dto/create-book-author.dto';
import { UpdateBookAuthorDto } from './dto/update-book-author.dto';

@Controller('book-author')
export class BookAuthorController {
  constructor(private readonly bookAuthorService: BookAuthorService) {}

  @Get()
  getAllBookAuthorRelationships() {
    return this.bookAuthorService.getAllBookAuthorRelationships();
  }

  @Get('books')
  getBooksFromAuthor(@Query('authorID', ParseIntPipe) authorID: number){
    return this.bookAuthorService.getBooksFromAuthor(authorID)
  }

  @Get('authors')
  getAuthorsFromBook(@Query('bookID', ParseIntPipe) bookID: number){
    return this.bookAuthorService.getAuthorsFromBook(bookID)
  }

  @Get(':id')
  getBookAuthorRelationship(@Param('id', ParseIntPipe) id: number) {
    return this.bookAuthorService.getBookAuthorRelationship(id);
  }

  @Post()
  addAuthorToBook(@Body(new ValidationPipe()) createBookAuthorDto: CreateBookAuthorDto) {
    return this.bookAuthorService.addAuthorToBook(createBookAuthorDto);
  }
}
