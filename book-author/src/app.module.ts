import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { AuthorsModule } from './authors/authors.module';
import { BookAuthorModule } from './book-author/book-author.module';

@Module({
  imports: [BooksModule, AuthorsModule, BookAuthorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
