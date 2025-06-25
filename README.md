# Book & Author Management API

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

A NestJS API for managing books and authors with validation, error handling, and data relationships.

## 🚀 Features

### Core Modules
- **Books Module**: Complete CRUD operations for book management
- **Authors Module**: Full author lifecycle management
- **Many-to-Many Relationships**: Books can have multiple authors, authors can write multiple books

### Data Transfer Objects (DTOs)
- **Book DTOs**: Create, Update, and Response DTOs with comprehensive validation
- **Author DTOs**: Structured data transfer with validation rules
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

## 📚 API Endpoints

### Books
```
GET    /books                           # Get all books
GET    /books/:id                       # Get book by ID
POST   /books                           # Create new book
PATCH  /books/:id                       # Update book
DELETE /books/:id                       # Delete book
POST   /books/:bookId/authors/:authorId # Add author to book
DELETE /books/:bookId/authors/:authorId # Remove author from book
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
POST   /books/:bookId/authors/:authorId   # Add author to book
DELETE /books/:bookId/authors/:authorId   # Remove author from book
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
- **Many-to-Many**: Books ↔ Authors relationship
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
│   ├── authors.controller.ts
│   ├── authors.service.ts
│   └── authors.module.ts
├── books/
│   ├── dto/
│   │   ├── create-book.dto.ts
│   │   ├── update-book.dto.ts
│   │   └── book-response.dto.ts
│   ├── books.controller.ts
│   ├── books.service.ts
│   └── books.module.ts
├── common/
│   ├── decorators/
│   │   ├── nonempty_string.decorator.ts
│   │   └── positive_id.decorator.ts
│   ├── exception filters/
│   │   └── http-exception.filter.ts
│   └── mock data/
│       ├── authors.ts
│       └── books.ts
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