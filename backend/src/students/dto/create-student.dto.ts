/**
 * create-student.dto.ts
 * -----------------------------------------------
 * Data Transfer Object for creating a new student.
 * Validated using class-validator decorators.
 */

import { IsString, IsEmail, IsInt, IsNotEmpty, Min, Max } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required.' })
  name: string;

  @IsEmail({}, { message: 'Please enter a valid email address.' })
  @IsNotEmpty({ message: 'Email is required.' })
  email: string;

  @IsInt({ message: 'Age must be a whole number.' })
  @Min(1, { message: 'Age must be at least 1.' })
  @Max(120, { message: 'Age must be at most 120.' })
  age: number;
}
