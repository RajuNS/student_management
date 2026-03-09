/**
 * update-student.dto.ts
 * -----------------------------------------------
 * DTO for updating an existing student.
 * All fields are optional (partial update).
 */

import { IsString, IsEmail, IsInt, IsOptional, Min, Max } from 'class-validator';

export class UpdateStudentDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Please enter a valid email address.' })
  email?: string;

  @IsOptional()
  @IsInt({ message: 'Age must be a whole number.' })
  @Min(1, { message: 'Age must be at least 1.' })
  @Max(120, { message: 'Age must be at most 120.' })
  age?: number;
}
