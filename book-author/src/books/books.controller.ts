import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  @ApiOperation({ summary: 'Get all books' })
  //http://localhost:3000/books
  getBooks() {
    return this.booksService.getAllBooks();
  }

  //http://localhost:3000/books/:id
  @Get(':id')
  @ApiOperation({ summary: 'Get a book by ID' })
  @ApiParam({ 
    name: 'id', 
    type: 'number', 
    description: 'The unique identifier of the book'
  })
  getOneBook(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.getBook(id);
  }

  //http://localhost:3000/books
  @Post()
  @ApiOperation({ summary: 'Create a new book' })
  @ApiBody({ 
    type: CreateBookDto,
    description: 'Book data to create'
  })
  createBook(@Body(new ValidationPipe()) createBookDto: CreateBookDto) {
    return this.booksService.createBook(createBookDto);
  }

  //http://localhost:3000/books/:id
  @Patch(':id')
  @ApiOperation({ summary: 'Update a book' })
  @ApiParam({ 
    name: 'id', 
    type: 'number', 
    description: 'The unique identifier of the book to update'
  })
  @ApiBody({ 
    type: UpdateBookDto,
    description: 'Updated book data'
  })
  updateBook(@Param('id', ParseIntPipe) id: number, @Body(new ValidationPipe()) updateBookDto: UpdateBookDto) {
    return this.booksService.updateBook(id, updateBookDto);
  }

  //http://localhost:3000/books/:id
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a book' })
  @ApiParam({ 
    name: 'id', 
    type: 'number', 
    description: 'The unique identifier of the book to delete'
  })
  deleteBook(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.deleteBook(id);
  }
}
