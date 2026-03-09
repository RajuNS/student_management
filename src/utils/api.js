/**
 * api.js
 * -----------------------------------------------
 * API service layer for the React frontend.
 * Wraps all fetch calls to the NestJS backend.
 *
 * Defaults to http://localhost:3000 when running locally.
 * Change API_BASE to your production URL for deployment.
 */

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/students";

/**
 * Fetch all students. Optionally pass a search query.
 * @param {string} [search] - Filter by name or email.
 * @returns {Promise<Array>} Array of student objects.
 */
export async function fetchStudents(search = "") {
  const url = search
    ? `${API_BASE}?search=${encodeURIComponent(search)}`
    : API_BASE;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch students.");
  return res.json();
}

/**
 * Create a new student.
 * @param {{ name: string, email: string, age: number }} data
 * @returns {Promise<Object>} The created student.
 */
export async function createStudent(data) {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (res.status === 409) {
    const body = await res.json();
    throw new Error(body.message || "Email already exists.");
  }
  if (!res.ok) throw new Error("Failed to create student.");
  return res.json();
}

/**
 * Update an existing student.
 * @param {string} id - Student UUID.
 * @param {{ name?: string, email?: string, age?: number }} data
 * @returns {Promise<Object>} The updated student.
 */
export async function updateStudent(id, data) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (res.status === 409) {
    const body = await res.json();
    throw new Error(body.message || "Email already exists.");
  }
  if (!res.ok) throw new Error("Failed to update student.");
  return res.json();
}

/**
 * Delete a student.
 * @param {string} id - Student UUID.
 */
export async function deleteStudent(id) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete student.");
}
