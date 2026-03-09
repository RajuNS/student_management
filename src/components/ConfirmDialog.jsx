/**
 * ConfirmDialog.jsx
 * -----------------------------------------------
 * Reusable modal confirmation dialog. Shown before
 * destructive actions like deleting a student.
 *
 * Props:
 *  - message   : Text displayed inside the dialog.
 *  - onConfirm : Callback when the user clicks "Yes, Delete".
 *  - onCancel  : Callback when the user clicks "Cancel".
 */

import React from "react";
import { AlertTriangle } from "lucide-react";

const ConfirmDialog = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      {/* Stop click propagation so clicking inside the box doesn't close it */}
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-icon">
          <AlertTriangle size={36} />
        </div>
        <h3 className="modal-title">Confirm Deletion</h3>
        <p className="modal-message">{message}</p>
        <div className="modal-actions">
          <button
            id="confirm-cancel-btn"
            className="btn btn-secondary"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            id="confirm-delete-btn"
            className="btn btn-danger"
            onClick={onConfirm}
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
