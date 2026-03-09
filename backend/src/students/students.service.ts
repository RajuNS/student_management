/**
 * students.service.ts
 * -----------------------------------------------
 * Business logic layer for Student CRUD operations.
 * Uses TypeORM's Repository pattern for database access.
 */

import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Student } from './entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
  ) {}

  /**
   * Create a new student.
   * Throws ConflictException if email already exists.
   */
  async create(dto: CreateStudentDto): Promise<Student> {
    // Check for duplicate email
    const existing = await this.studentRepo.findOne({
      where: { email: dto.email },
    });
    if (existing) {
      throw new ConflictException('A student with this email already exists.');
    }

    const student = this.studentRepo.create(dto);
    return this.studentRepo.save(student);
  }

  /**
   * Retrieve all students. Optionally filter by search query
   * (matches name or email with LIKE).
   */
  async findAll(search?: string): Promise<Student[]> {
    if (search) {
      return this.studentRepo.find({
        where: [
          { name: Like(`%${search}%`) },
          { email: Like(`%${search}%`) },
        ],
        order: { createdAt: 'ASC' },
      });
    }
    return this.studentRepo.find({ order: { createdAt: 'ASC' } });
  }

  /**
   * Retrieve a single student by ID.
   * Throws NotFoundException if not found.
   */
  async findOne(id: string): Promise<Student> {
    const student = await this.studentRepo.findOne({ where: { id } });
    if (!student) {
      throw new NotFoundException(`Student with ID "${id}" not found.`);
    }
    return student;
  }

  /**
   * Update an existing student.
   * Throws NotFoundException if not found.
   * Throws ConflictException if new email collides with another student.
   */
  async update(id: string, dto: UpdateStudentDto): Promise<Student> {
    const student = await this.findOne(id);

    // If email is being changed, check for conflicts
    if (dto.email && dto.email !== student.email) {
      const existing = await this.studentRepo.findOne({
        where: { email: dto.email },
      });
      if (existing) {
        throw new ConflictException('A student with this email already exists.');
      }
    }

    Object.assign(student, dto);
    return this.studentRepo.save(student);
  }

  /**
   * Delete a student by ID.
   * Throws NotFoundException if not found.
   */
  async remove(id: string): Promise<void> {
    const student = await this.findOne(id);
    await this.studentRepo.remove(student);
  }

  /**
   * Seed initial data if the table is empty.
   */
  async seed(): Promise<void> {
    const count = await this.studentRepo.count();
    if (count > 0) return;

    const seedData: CreateStudentDto[] = [
      { name: 'Aarav Sharma', email: 'aarav.sharma@email.com', age: 21 },
      { name: 'Priya Patel', email: 'priya.patel@email.com', age: 22 },
      { name: 'Rohan Gupta', email: 'rohan.gupta@email.com', age: 20 },
      { name: 'Sneha Reddy', email: 'sneha.reddy@email.com', age: 23 },
      { name: 'Karan Mehta', email: 'karan.mehta@email.com', age: 19 },
      { name: 'Ananya Joshi', email: 'ananya.joshi@email.com', age: 21 },
      { name: 'Vikram Singh', email: 'vikram.singh@email.com', age: 24 },
      { name: 'Neha Verma', email: 'neha.verma@email.com', age: 22 },
    ];

    for (const data of seedData) {
      const student = this.studentRepo.create(data);
      await this.studentRepo.save(student);
    }

    console.log('🌱 Seeded 8 initial students.');
  }
}
