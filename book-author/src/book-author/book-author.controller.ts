import { Controller, Get, Post, Body, Param, Delete, Query, ParseIntPipe, Patch } from '@nestjs/common';
import { BookAuthorService } from './book-author.service';
import { CreateBookAuthorDto } from './dto/create-book-author.dto';
import { UpdateBookAuthorDto } from './dto/update-book-author.dto';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiQuery } from '@nestjs/swagger';

@ApiTags('Book-Author Relationships')
@Controller('book-author')
export class BookAuthorController {
  constructor(private readonly bookAuthorService: BookAuthorService) {}

  //http://localhost:3000/book-author
  @Get()
  @ApiOperation({ summary: 'Get all book-author relationships' })
  getAllBookAuthorRelationships() {
    return this.bookAuthorService.getAllBookAuthorRelationships();
  }

  //http://localhost:3000/book-author/books?authorID=id
  @Get('books')
  @ApiOperation({ summary: 'Get books by author' })
  @ApiQuery({ 
    name: 'authorId', 
    type: 'number', 
    description: 'The unique identifier of the author whose books to retrieve'
  })
  getBooksFromAuthor(@Query('authorId', ParseIntPipe) authorId: number){
    return this.bookAuthorService.getBooksFromAuthor(authorId)
  }

  //http://localhost:3000/book-author/authors?bookId=:id
  @Get('authors')
  @ApiOperation({  summary: 'Get authors by book' })
  @ApiQuery({ 
    name: 'bookId', 
    type: 'number', 
    description: 'The unique identifier of the book whose authors to retrieve'
  })
  getAuthorsFromBook(@Query('bookId', ParseIntPipe) bookId: number){
    return this.bookAuthorService.getAuthorsFromBook(bookId)
  }

  //http://localhost:3000/book-author/:id
  @Get(':id')
  @ApiOperation({ summary: 'Get book-author relationship by ID' })
  @ApiParam({ 
    name: 'id', 
    type: 'number', 
    description: 'The unique identifier of the book-author relationship'
  })
  getBookAuthorRelationship(@Param('id', ParseIntPipe) id: number) {
    return this.bookAuthorService.getBookAuthorRelationship(id);
  }

  //http://localhost:3000/book-author
  @Post()
  @ApiOperation({ summary: 'Add author to book' })
  @ApiBody({ 
    type: CreateBookAuthorDto,
    description: 'Book-author relationship data to create'
  })
  addAuthorToBook(@Body() createBookAuthorDto: CreateBookAuthorDto) {
    return this.bookAuthorService.addAuthorToBook(createBookAuthorDto);
  }

  //http://localhost:3000/book-author/:id
  @Patch(':id')
  @ApiOperation({ summary: 'Update book-author relationship' })
  @ApiParam({ 
    name: 'id', 
    type: 'number', 
    description: 'The unique identifier of the book-author relationship to update'
  })
  @ApiBody({ 
    type: UpdateBookAuthorDto,
    description: 'Updated book-author relationship data'
  })
  updateBookAuthorRelationship(@Param('id', ParseIntPipe) id: number, @Body() updateBookAuthorDto: UpdateBookAuthorDto) {
    return this.bookAuthorService.updateBookAuthorRelationship(id, updateBookAuthorDto);
  }

  //http://localhost:3000/book-author/:bookId/:authorId
  @Delete(':bookId/:authorId')
  @ApiOperation({ summary: 'Remove author from book' })
  @ApiParam({ 
    name: 'bookId', 
    type: 'number', 
    description: 'The unique identifier of the book'
  })
  @ApiParam({ 
    name: 'authorId', 
    type: 'number', 
    description: 'The unique identifier of the author'
  })
  removeAuthorFromBook(@Param('bookId', ParseIntPipe) bookId: number, @Param('authorId', ParseIntPipe) authorId: number) {
    return this.bookAuthorService.removeAuthorFromBook(bookId, authorId);
  }

  //http://localhost:3000/book-author/:id
  @Delete(':id')
  @ApiOperation({ summary: 'Delete book-author relationship' })
  @ApiParam({ 
    name: 'id', 
    type: 'number', 
    description: 'The unique identifier of the book-author relationship to delete'
  })
  deleteAuthor(@Param('id', ParseIntPipe) id: number) {
    return this.bookAuthorService.removeBookAuthorRelationship(id)
  }
}
