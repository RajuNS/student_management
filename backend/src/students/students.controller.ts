/**
 * students.controller.ts
 * -----------------------------------------------
 * REST controller for the /api/students endpoints.
 *
 * Endpoints:
 *  GET    /api/students         - List all (optional ?search= query)
 *  GET    /api/students/:id     - Get one by ID
 *  POST   /api/students         - Create new
 *  PUT    /api/students/:id     - Update existing
 *  DELETE /api/students/:id     - Delete
 */

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller('api/students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  /** GET /api/students?search=query */
  @Get()
  findAll(@Query('search') search?: string) {
    return this.studentsService.findAll(search);
  }

  /** GET /api/students/:id */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(id);
  }

  /** POST /api/students */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateStudentDto) {
    return this.studentsService.create(dto);
  }

  /** PUT /api/students/:id */
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateStudentDto) {
    return this.studentsService.update(id, dto);
  }

  /** DELETE /api/students/:id */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.studentsService.remove(id);
  }
}
