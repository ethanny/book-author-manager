import { applyDecorators } from '@nestjs/common';
import { IsInt, IsPositive } from 'class-validator';

export function PositiveIntID(isArray: boolean = false, label: string) {
  if (isArray) {
    return applyDecorators(
      IsInt({ each: true, message: `Each ${label} ID must be an integer` }),
      IsPositive({ each: true, message: `Each ${label} ID must be a positive integer` })
    );
  } else {
    return applyDecorators(
      IsInt({ message: `${label} ID must be an integer` }),
      IsPositive({ message: `${label} ID must be a positive integer` })
    );
  }
} 