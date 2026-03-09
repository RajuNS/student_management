/**
 * excelExport.js
 * -----------------------------------------------
 * Utility for exporting student data to an Excel (.xlsx)
 * file using the SheetJS (xlsx) library.
 */

import * as XLSX from "xlsx";

/**
 * Exports an array of student objects to an Excel file.
 *
 * @param {Array<Object>} data  - Array of student records to export.
 * @param {string} filename     - Name of the downloaded file (without extension).
 */
export function exportToExcel(data, filename = "students") {
  // Map the raw data to a clean export format (exclude internal `id`)
  const exportData = data.map((student) => ({
    Name: student.name,
    Email: student.email,
    Age: student.age,
  }));

  // Create a new workbook and worksheet
  const worksheet = XLSX.utils.json_to_sheet(exportData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

  // Auto-size columns for better readability
  const maxWidths = exportData.reduce(
    (widths, row) => ({
      Name: Math.max(widths.Name, row.Name.length),
      Email: Math.max(widths.Email, row.Email.length),
      Age: Math.max(widths.Age, String(row.Age).length),
    }),
    { Name: 4, Email: 5, Age: 3 } // minimum = header lengths
  );

  worksheet["!cols"] = [
    { wch: maxWidths.Name + 2 },
    { wch: maxWidths.Email + 2 },
    { wch: maxWidths.Age + 2 },
  ];

  // Trigger download
  XLSX.writeFile(workbook, `${filename}.xlsx`);
}
