# Book & Author Management API

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

A NestJS API for managing books and authors with validation, error handling, and data relationships.

## 🚀 Features

### Core Modules
- **Books Module**: Complete CRUD operations for book management
- **Authors Module**: Full author lifecycle management
- **Book-Author Module**: Dedicated relationship management between books and authors
- **Many-to-Many Relationships**: Books can have multiple authors, authors can write multiple books

### Data Transfer Objects (DTOs)
- **Book DTOs**: Create, Update, and Response DTOs with comprehensive validation
- **Author DTOs**: Structured data transfer with validation rules
- **Book-Author DTOs**: Relationship management DTOs for linking books and authors
- **Validation**: Powered by `class-validator` for robust input validation

### Advanced Validation
- **Class Validator Integration**: Built-in validation decorators
- **Custom Validation Decorators**: 
  - `@NonEmptyString()`: Validates non-empty string inputs
  - `@PositiveId()`: Validates positive integer IDs
- **Validation Pipes**: Automatic request validation in controllers

### Error Handling
- **Custom Exception Filter**: Centralized HTTP error handling
- **Structured Error Responses**: Consistent error format across the API

### Data Storage
- **In-Memory Storage**: Mock data storage for development and testing
- **Seeded Data**: Pre-populated books and authors for immediate testing

### API Documentation
- **Swagger Integration**: Interactive API documentation available at `/api`
- **Comprehensive Documentation**: All endpoints documented with request/response schemas
- **API Tags**: Organized endpoints by module (Books, Authors, Book-Author Relationships)

## 📚 API Endpoints

### Books
```
GET    /books           # Get all books
GET    /books/:id       # Get book by ID
POST   /books           # Create new book
PATCH  /books/:id       # Update book
DELETE /books/:id       # Delete book
```

### Authors
```
GET    /authors         # Get all authors
GET    /authors/:id     # Get author by ID
POST   /authors         # Create new author
PATCH  /authors/:id     # Update author
DELETE /authors/:id     # Delete author
```

### Book-Author Relationships
```
GET    /book-author                        # Get all book-author relationships
GET    /book-author/:id                    # Get book-author relationship by ID
GET    /book-author/books?authorId=:id     # Get books by author
GET    /book-author/authors?bookId=:id     # Get authors by book
POST   /book-author                        # Add author to book
PATCH  /book-author/:id                    # Update book-author relationship
DELETE /book-author/:bookId/:authorId      # Remove author from book
DELETE /book-author/:id                    # Delete book-author relationship
```

## 🛠️ Technical Implementation

### Validation Strategy
- **Input Validation**: All DTOs use class-validator decorators
- **Custom Business Logic**: Custom validation decorator for domain-specific rules
- **Pipeline Integration**: ValidationPipe automatically validates incoming requests

### Error Management
- **Global Exception Filter**: Catches and formats all HTTP exceptions
- **Consistent Responses**: Standardized error response structure
- **Detailed Error Messages**: Clear validation and business logic error feedback

### Data Relationships
- **Many-to-Many**: Books ↔ Authors relationship with dedicated management module
- **Cascade Operations**: Efficient relationship management
- **Data Integrity**: Proper relationship validation and constraints

## 🏗️ Project Structure

```
src/
├── authors/
│   ├── dto/
│   │   ├── create-author.dto.ts
│   │   ├── update-author.dto.ts
│   │   └── author-response.dto.ts
│   ├── entities/
│   │   └── author.entity.ts
│   ├── authors.controller.ts
│   ├── authors.service.ts
│   ├── authors.module.ts
│   └── authors.*.spec.ts
├── books/
│   ├── dto/
│   │   ├── create-book.dto.ts
│   │   ├── update-book.dto.ts
│   │   └── book-response.dto.ts
│   ├── entities/
│   │   └── book.entity.ts
│   ├── books.controller.ts
│   ├── books.service.ts
│   ├── books.module.ts
│   └── books.*.spec.ts
├── book-author/
│   ├── dto/
│   │   ├── create-book-author.dto.ts
│   │   └── update-book-author.dto.ts
│   ├── entities/
│   │   └── book-author.entity.ts
│   ├── book-author.controller.ts
│   ├── book-author.service.ts
│   ├── book-author.module.ts
│   └── book-author.*.spec.ts
├── common/
│   ├── decorators/
│   │   ├── nonempty_string.decorator.ts
│   │   └── positive_id.decorator.ts
│   ├── exception filters/
│   │   └── http-exception.filter.ts
│   └── mock data/
│       ├── authors.ts
│       └── books.ts
├── app.controller.ts
├── app.service.ts
├── app.module.ts
└── main.ts
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
$ git clone https://github.com/ethanny/book-author-manager.git
$ cd book-author

# Install dependencies
$ npm install
```

### Development

```bash
# Start in development mode
$ npm run start:dev
```

### API Documentation

Once the application is running, you can access the interactive Swagger documentation at:

```
http://localhost:3000/api
```

The Swagger UI provides:
- Interactive endpoint testing
- Request/response schemas
- Model definitions
- API authentication (if configured)
- Organized endpoints by tags (Books, Authors, Book-Author Relationships)