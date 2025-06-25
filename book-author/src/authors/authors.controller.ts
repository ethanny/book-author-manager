import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, ValidationPipe, NotFoundException, UseFilters } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  //http://localhost:3000/authors
  getAuthors() {
    return this.authorsService.getAllAuthors();
  }

  //http://localhost:3000/authors/:id
  @Get(':id')
  getOneAuthor(@Param('id', ParseIntPipe) id: number) {
    return this.authorsService.getAuthor(id);
  }

  //http://localhost:3000/authors
  @Post()
  create(@Body(new ValidationPipe()) createAuthorDto: CreateAuthorDto) {
    return this.authorsService.createAuthor(createAuthorDto);
  }

  //http://localhost:3000/authors/:id
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body(new ValidationPipe()) updateAuthorDto: UpdateAuthorDto) {
    return this.authorsService.updateAuthor(id, updateAuthorDto);
  }

  //http://localhost:3000/authors/:id
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.authorsService.deleteAuthor(id);
  }
}
