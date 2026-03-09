/**
 * students.module.ts
 * -----------------------------------------------
 * NestJS feature module for the Students resource.
 * Registers the TypeORM repository, service, and controller.
 */

import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Student])],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule implements OnModuleInit {
  constructor(private readonly studentsService: StudentsService) {}

  /**
   * Seed initial data when the module initialises.
   * Only inserts if the students table is empty.
   */
  async onModuleInit() {
    await this.studentsService.seed();
  }
}
