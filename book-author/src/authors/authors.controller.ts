import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Authors')
@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all authors'})
  //http://localhost:3000/authors
  getAuthors() {
    return this.authorsService.getAllAuthors();
  }

  //http://localhost:3000/authors/:id
  @Get(':id')
  @ApiOperation({ summary: 'Get an author by ID' })
  @ApiParam({ 
    name: 'id', 
    type: 'number', 
    description: 'The unique identifier of the author'
  })
  getOneAuthor(@Param('id', ParseIntPipe) id: number) {
    return this.authorsService.getAuthor(id);
  }

  //http://localhost:3000/authors
  @Post()
  @ApiOperation({ summary: 'Create a new author' })
  @ApiBody({ 
    type: CreateAuthorDto,
    description: 'Author data to create'
  })
  createAuthor(@Body(new ValidationPipe()) createAuthorDto: CreateAuthorDto) {
    return this.authorsService.createAuthor(createAuthorDto);
  }

  //http://localhost:3000/authors/:id
  @Patch(':id')
  @ApiOperation({ summary: 'Update an author' })
  @ApiParam({ 
    name: 'id', 
    type: 'number', 
    description: 'The unique identifier of the author to update'
  })
  @ApiBody({ 
    type: UpdateAuthorDto,
    description: 'Updated author data'
  })
  updateAuthor(@Param('id', ParseIntPipe) id: number, @Body(new ValidationPipe()) updateAuthorDto: UpdateAuthorDto) {
    return this.authorsService.updateAuthor(id, updateAuthorDto);
  }

  //http://localhost:3000/authors/:id
  @Delete(':id')
  @ApiOperation({ summary: 'Delete an author' })
  @ApiParam({ 
    name: 'id', 
    type: 'number', 
    description: 'The unique identifier of the author to delete'
  })
  deleteAuthor(@Param('id', ParseIntPipe) id: number) {
    return this.authorsService.deleteAuthor(id);
  }
}
