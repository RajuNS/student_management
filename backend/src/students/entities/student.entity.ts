/**
 * student.entity.ts
 * -----------------------------------------------
 * TypeORM entity for the Student table.
 *
 * Columns:
 *  - id        : UUID, auto-generated primary key
 *  - name      : Student's full name
 *  - email     : Unique email address
 *  - age       : Positive integer
 *  - createdAt : Auto-set on insert
 *  - updatedAt : Auto-set on update
 */

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 150, unique: true })
  email: string;

  @Column('int')
  age: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
