import { PositiveIntID } from "src/common/decorators/positive_id.decorator";

export class CreateBookAuthorDto {
    @PositiveIntID(false, 'BookAuthor')
    bookAuthorId: number;

    @PositiveIntID(false, 'Book')
    bookId: number;

    @PositiveIntID(false, 'Author')
    authorId: number;
}
