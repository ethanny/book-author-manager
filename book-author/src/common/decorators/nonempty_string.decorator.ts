import { applyDecorators } from '@nestjs/common';
import { IsNotEmpty, IsString } from 'class-validator';

export function NonEmptyString(label: string) {
    return applyDecorators(
        IsString({ message: `${label} must be a string` }),
        IsNotEmpty({ message: `${label} cannot be empty` })
    );
} 



