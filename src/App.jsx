/**
 * App.jsx
 * -----------------------------------------------
 * Root component for the Students Table Management System.
 *
 * Responsibilities:
 *  - CRUD operations via the NestJS REST API.
 *  - Falls back to localStorage when the backend is unreachable.
 *  - Search / filter students by name or email.
 *  - Simulated loading state on mount (800 ms).
 *  - Excel export (filtered or full dataset).
 */

import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  GraduationCap,
  Download,
  FileSpreadsheet,
  Users,
  Server,
  HardDrive,
} from "lucide-react";

// Components
import Loader from "./components/Loader";
import SearchBar from "./components/SearchBar";
import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";
import ConfirmDialog from "./components/ConfirmDialog";

// Utilities & data
import { exportToExcel } from "./utils/excelExport";
import {
  fetchStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "./utils/api";
import seedStudents from "./data/studentsData";

/** localStorage key for fallback persistence */
const STORAGE_KEY = "students_data";

function App() {
  // ======================== STATE ========================

  /** All student records */
  const [students, setStudents] = useState([]);
  /** Simulated loading flag */
  const [loading, setLoading] = useState(true);
  /** Current search query */
  const [searchQuery, setSearchQuery] = useState("");
  /** Student currently being edited (null = add mode) */
  const [editingStudent, setEditingStudent] = useState(null);
  /** Student pending deletion (drives confirm dialog) */
  const [deletingStudent, setDeletingStudent] = useState(null);
  /** Whether we're connected to the backend API */
  const [useApi, setUseApi] = useState(false);
  /** Error toast message */
  const [errorMsg, setErrorMsg] = useState("");

  // ======================== HELPERS ========================

  /** Show a temporary error toast (auto-clears after 4s) */
  const showError = (msg) => {
    setErrorMsg(msg);
    setTimeout(() => setErrorMsg(""), 4000);
  };

  /** Save students to localStorage (fallback mode) */
  const saveToStorage = (data) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  // ======================== EFFECTS ========================

  /**
   * On mount: try to load from the backend API first.
   * If the backend is unreachable, fall back to localStorage / seed data.
   */
  useEffect(() => {
    const loadStudents = async () => {
      try {
        const data = await fetchStudents();
        setStudents(data);
        setUseApi(true);
      } catch {
        // Backend not available — fall back to localStorage
        console.warn("⚠️ Backend unreachable, using localStorage fallback.");
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          setStudents(JSON.parse(stored));
        } else {
          setStudents(seedStudents);
        }
        setUseApi(false);
      } finally {
        // Simulate a short loading delay for UX
        setTimeout(() => setLoading(false), 800);
      }
    };

    loadStudents();
  }, []);

  /**
   * Persist students to localStorage when in fallback mode.
   */
  useEffect(() => {
    if (!loading && !useApi) {
      saveToStorage(students);
    }
  }, [students, loading, useApi]);

  // ======================== DERIVED DATA ========================

  /** Filtered students based on the search query */
  const filteredStudents = useMemo(() => {
    if (!searchQuery.trim()) return students;
    const q = searchQuery.toLowerCase();
    return students.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q)
    );
  }, [students, searchQuery]);

  // ======================== HANDLERS ========================

  /** Add a new student */
  const handleAddStudent = useCallback(
    async (data) => {
      try {
        if (useApi) {
          const created = await createStudent(data);
          setStudents((prev) => [...prev, created]);
        } else {
          const newStudent = { ...data, id: crypto.randomUUID() };
          setStudents((prev) => [...prev, newStudent]);
        }
      } catch (err) {
        showError(err.message);
      }
    },
    [useApi]
  );

  /** Update an existing student */
  const handleUpdateStudent = useCallback(
    async (data) => {
      try {
        if (useApi) {
          const updated = await updateStudent(editingStudent.id, data);
          setStudents((prev) =>
            prev.map((s) => (s.id === editingStudent.id ? updated : s))
          );
        } else {
          setStudents((prev) =>
            prev.map((s) =>
              s.id === editingStudent.id ? { ...s, ...data } : s
            )
          );
        }
        setEditingStudent(null);
      } catch (err) {
        showError(err.message);
      }
    },
    [editingStudent, useApi]
  );

  /** Initiate delete (show confirmation dialog) */
  const handleDeleteRequest = useCallback((student) => {
    setDeletingStudent(student);
  }, []);

  /** Confirm deletion */
  const handleConfirmDelete = useCallback(async () => {
    try {
      if (useApi) {
        await deleteStudent(deletingStudent.id);
      }
      setStudents((prev) =>
        prev.filter((s) => s.id !== deletingStudent.id)
      );
      setDeletingStudent(null);
    } catch (err) {
      showError(err.message);
      setDeletingStudent(null);
    }
  }, [deletingStudent, useApi]);

  /** Cancel deletion */
  const handleCancelDelete = useCallback(() => {
    setDeletingStudent(null);
  }, []);

  /** Enter edit mode for a student */
  const handleEditRequest = useCallback((student) => {
    setEditingStudent(student);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  /** Cancel editing */
  const handleCancelEdit = useCallback(() => {
    setEditingStudent(null);
  }, []);

  // ======================== RENDER ========================

  if (loading) return <Loader />;

  return (
    <div className="app">
      {/* -------- Header -------- */}
      <header className="app-header">
        <div className="header-content">
          <div className="header-title">
            <GraduationCap size={32} />
            <h1>Student Management System</h1>
          </div>
          <div className="header-badges">
            <div className="header-badge">
              <Users size={16} />
              <span>{students.length} Students</span>
            </div>
            <div className={`header-badge ${useApi ? "badge-api" : "badge-local"}`}>
              {useApi ? <Server size={14} /> : <HardDrive size={14} />}
              <span>{useApi ? "API Connected" : "Local Storage"}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="app-main">
        {/* -------- Error Toast -------- */}
        {errorMsg && (
          <div className="error-toast" role="alert">
            {errorMsg}
          </div>
        )}

        {/* -------- Form Card -------- */}
        <section className="card form-card" aria-label="Student form">
          <StudentForm
            onSubmit={editingStudent ? handleUpdateStudent : handleAddStudent}
            studentToEdit={editingStudent}
            onCancel={handleCancelEdit}
          />
        </section>

        {/* -------- Toolbar: Search + Export -------- */}
        <section className="toolbar" aria-label="Table controls">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />

          <div className="export-buttons">
            <button
              id="export-filtered-btn"
              className="btn btn-outline"
              onClick={() =>
                exportToExcel(filteredStudents, "students_filtered")
              }
              disabled={filteredStudents.length === 0}
              title="Download currently visible rows"
            >
              <Download size={16} />
              Export Filtered
            </button>
            <button
              id="export-all-btn"
              className="btn btn-outline"
              onClick={() => exportToExcel(students, "students_all")}
              disabled={students.length === 0}
              title="Download all student records"
            >
              <FileSpreadsheet size={16} />
              Export All
            </button>
          </div>
        </section>

        {/* -------- Table Card -------- */}
        <section className="card table-card" aria-label="Students table">
          <StudentTable
            students={filteredStudents}
            onEdit={handleEditRequest}
            onDelete={handleDeleteRequest}
          />
        </section>
      </main>

      {/* -------- Footer -------- */}
      <footer className="app-footer">
        <p>© 2026 Student Management System. Built with React + Vite + NestJS.</p>
      </footer>

      {/* -------- Confirm Dialog -------- */}
      {deletingStudent && (
        <ConfirmDialog
          message={`Are you sure you want to delete "${deletingStudent.name}"? This action cannot be undone.`}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
}

export default App;
