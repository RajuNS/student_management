/**
 * studentsData.js
 * -----------------------------------------------
 * Seed data for the Students Table Management System.
 * This data is loaded into state on first launch when
 * localStorage is empty. Each student has a unique `id`,
 * `name`, `email`, and `age`.
 */

const studentsData = [
  {
    id: crypto.randomUUID(),
    name: "Aarav Sharma",
    email: "aarav.sharma@email.com",
    age: 21,
  },
  {
    id: crypto.randomUUID(),
    name: "Priya Patel",
    email: "priya.patel@email.com",
    age: 22,
  },
  {
    id: crypto.randomUUID(),
    name: "Rohan Gupta",
    email: "rohan.gupta@email.com",
    age: 20,
  },
  {
    id: crypto.randomUUID(),
    name: "Sneha Reddy",
    email: "sneha.reddy@email.com",
    age: 23,
  },
  {
    id: crypto.randomUUID(),
    name: "Karan Mehta",
    email: "karan.mehta@email.com",
    age: 19,
  },
  {
    id: crypto.randomUUID(),
    name: "Ananya Joshi",
    email: "ananya.joshi@email.com",
    age: 21,
  },
  {
    id: crypto.randomUUID(),
    name: "Vikram Singh",
    email: "vikram.singh@email.com",
    age: 24,
  },
  {
    id: crypto.randomUUID(),
    name: "Neha Verma",
    email: "neha.verma@email.com",
    age: 22,
  },
];

export default studentsData;
