import { ConflictException, ForbiddenException, Injectable, NotFoundException,} from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { mock_authors } from 'src/common/mock data/authors';
import { CreateBookAuthorDto } from 'src/book-author/dto/create-book-author.dto';
import { mock_book_authors } from 'src/common/mock data/book-authors';

@Injectable()
export class AuthorsService {
  private authors: CreateAuthorDto[] = mock_authors
  private bookAuthor: CreateBookAuthorDto[] = mock_book_authors

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

  getAuthorsFromBook(authorIDs: number[]): CreateAuthorDto[] {
    return authorIDs.map(authorId => this.getAuthor(authorId));
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
    const { id, name } = createAuthorDto

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
      id: id,
    }

    this.authors = this.authors.map((author) => author.id === id ? updatedAuthor : author);

    return `Author(id: ${author.id}, name: ${author.name}) has been updated`;
  }

  checkAuthorHasBooks(id: number) {
    const author = this.getAuthor(id);
    const books = this.bookAuthor.filter((bookAuthor) => bookAuthor.authorId === id);
    
    if(books.length > 0){
      throw new ForbiddenException(`Author(id: ${id}, name: ${author.name}) has books and cannot be deleted`);
    }
  }

  // Delete an author
  deleteAuthor(id: number): String {
    const author = this.getAuthor(id);

    this.checkAuthorHasBooks(id);

    this.authors = this.authors.filter((author) => author.id !== id);

    return `Author(id: ${author.id}, name: ${author.name}) has been removed`;
  }
}
