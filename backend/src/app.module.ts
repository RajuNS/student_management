/**
 * app.module.ts
 * -----------------------------------------------
 * Root application module.
 *
 * Configures TypeORM with SQLite for local development.
 * To switch to PostgreSQL, update the TypeORM config below
 * (see commented PostgreSQL config).
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsModule } from './students/students.module';
import { Student } from './students/entities/student.entity';

@Module({
  imports: [
    // ─── SQLite (uncomment below & comment PostgreSQL to use SQLite) ───
    // TypeOrmModule.forRoot({
    //   type: 'better-sqlite3',
    //   database: 'students.db',
    //   entities: [Student],
    //   synchronize: true,
    // }),

    // ─── PostgreSQL (active) ───
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD, // Using env variable securely
      database: process.env.DB_NAME || 'student_management',
      entities: [Student],
      synchronize: true, // Auto-create tables (disable in production!)
    }),

    StudentsModule,
  ],
})
export class AppModule {}
