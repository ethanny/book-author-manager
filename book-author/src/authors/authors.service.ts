import { ConflictException, Injectable, NotFoundException, Inject, forwardRef, UseFilters } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { mock_authors } from 'src/common/mock data/authors';
import { BooksService } from 'src/books/books.service';

@Injectable()
export class AuthorsService {
  constructor(
    @Inject(forwardRef(() => BooksService))
    private readonly booksService: BooksService
  ) {}

  private authors: CreateAuthorDto[] = mock_authors

  // Get all authors
  getAllAuthors(): CreateAuthorDto[] {
    return this.authors;
  }

  // Get an author by id
  getAuthor(id: number): CreateAuthorDto {
    const author = this.authors.find((author) => author.id === id);

    if (!author) {
      throw new NotFoundException(`Author(id: ${id}) not found`);
    }

    return author;
  }

  // Check if an author exists
  checkAuthorExists(id: number) {
    const existingAuthor = this.authors.find((author) => author.id === id);

    if(existingAuthor){
      throw new ConflictException(`Author(id: ${id}, name: ${existingAuthor.name}) already exists`);
    }
  }

  // Create an author
  createAuthor(createAuthorDto: CreateAuthorDto): String {
    const { id, name} = createAuthorDto

    //Do not allow duplicate authors
    this.checkAuthorExists(id);

    const newAuthor = {...createAuthorDto}
    this.authors.push(newAuthor);

    return `Author(id: ${id}, name: ${name}) has been added`;
  }

  // Update an author
  updateAuthor(id: number, updateAuthorDto: UpdateAuthorDto): String {
    const author = this.getAuthor(id);

    //Preserve the same id after editing
    const updatedAuthor = {
      ...author, 
      ...updateAuthorDto,
      id: id
    }

    this.authors = this.authors.map((author) => author.id === id ? updatedAuthor : author);

    return `Author(id: ${author.id}, name: ${author.name}) has been updated`;
  }

  // Delete an author
  deleteAuthor(id: number): String {
    const author = this.getAuthor(id);

    //Remove author and remove any references to author from books
    this.authors = this.authors.filter((author) => author.id !== id);
    this.booksService.removeAuthorFromAllBooks(id);

    return `Author(id: ${author.id}, name: ${author.name}) has been removed`;
  }

  // Remove book from authors
  removeBookFromAllAuthors(bookId: number) {
    this.authors = this.authors.map((author) => ({
      ...author,
      booksAuthored: author.booksAuthored.filter((id) => id !== bookId) ?? [],
    }));
  }
}
