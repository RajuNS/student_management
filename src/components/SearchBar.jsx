/**
 * SearchBar.jsx
 * -----------------------------------------------
 * Search input component for filtering students
 * by name or email. Uses a controlled text input
 * with a search icon from lucide-react.
 */

import React from "react";
import { Search } from "lucide-react";

/**
 * @param {string}   value     - Current search query.
 * @param {Function} onChange  - Callback fired on input change.
 */
const SearchBar = ({ value, onChange }) => {
  return (
    <div className="search-bar">
      <Search className="search-icon" size={18} />
      <input
        id="search-input"
        type="text"
        placeholder="Search by name or email…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search students"
      />
    </div>
  );
};

export default SearchBar;
