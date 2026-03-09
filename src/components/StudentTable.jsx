/**
 * StudentTable.jsx
 * -----------------------------------------------
 * Renders the students data in a responsive table
 * with action buttons (Edit / Delete) per row.
 *
 * Props:
 *  - students : Array of student objects.
 *  - onEdit   : Callback when the Edit button is clicked.
 *  - onDelete : Callback when the Delete button is clicked.
 */

import React from "react";
import { Pencil, Trash2, Users } from "lucide-react";

const StudentTable = ({ students, onEdit, onDelete }) => {
  // Empty state
  if (students.length === 0) {
    return (
      <div className="empty-state">
        <Users size={48} />
        <h3>No Students Found</h3>
        <p>Add a new student or adjust your search filters.</p>
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table className="students-table" id="students-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student.id}>
              <td className="row-number">{index + 1}</td>
              <td className="student-name">{student.name}</td>
              <td className="student-email">{student.email}</td>
              <td className="student-age">{student.age}</td>
              <td className="student-actions">
                <button
                  className="btn btn-icon btn-edit"
                  onClick={() => onEdit(student)}
                  title="Edit student"
                  aria-label={`Edit ${student.name}`}
                >
                  <Pencil size={15} />
                  <span>Edit</span>
                </button>
                <button
                  className="btn btn-icon btn-delete"
                  onClick={() => onDelete(student)}
                  title="Delete student"
                  aria-label={`Delete ${student.name}`}
                >
                  <Trash2 size={15} />
                  <span>Delete</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
