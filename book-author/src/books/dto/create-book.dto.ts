import { Type } from "class-transformer";
import { ArrayMinSize, IsDate, IsEnum, MaxDate } from "class-validator";
import { NonEmptyString } from "src/common/decorators/nonempty_string.decorator";
import { PositiveIntID } from "src/common/decorators/positive_id.decorator";
import { Genre, Genres } from "src/common/mock data/books";

  export class CreateBookDto {
    @PositiveIntID(false, 'Book')
    id: number;
  
    @NonEmptyString('Title')
    title: string;
  
    @ArrayMinSize(1, { message: 'At least one genre must be provided' })
    @IsEnum(Genres, { each: true, message: 'Each genre must be a valid Genre' })
    genres: Genre[];
  
    @NonEmptyString('Publisher')
    publisher: string;
  
    @Type(() => Date)
    @IsDate({ message: 'Date published must be a valid date' })
    @MaxDate(new Date(), { message: 'Date published cannot be in the future' })
    datePublished: Date;
  }
