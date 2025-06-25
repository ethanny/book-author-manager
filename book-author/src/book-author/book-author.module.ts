import { Module } from '@nestjs/common';
import { BookAuthorService } from './book-author.service';
import { BookAuthorController } from './book-author.controller';
import { BooksService } from 'src/books/books.service';
import { AuthorsService } from 'src/authors/authors.service';

@Module({
  controllers: [BookAuthorController],
  providers: [BookAuthorService, BooksService, AuthorsService],
})
export class BookAuthorModule {}
