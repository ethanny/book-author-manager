import { NonEmptyString } from "src/common/decorators/nonempty_string.decorator";
import { PositiveIntID } from "src/common/decorators/positive_id.decorator";

export class CreateAuthorDto {
    @PositiveIntID(false, 'author')
    id: number;

    @NonEmptyString('Name')
    name: string;
}
