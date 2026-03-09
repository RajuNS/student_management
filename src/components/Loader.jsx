/**
 * Loader.jsx
 * -----------------------------------------------
 * Full-screen animated loading overlay displayed
 * during the simulated data-fetch on app mount.
 */

import React from "react";

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="loader-container">
        {/* Animated spinner ring */}
        <div className="loader-spinner" />
        <p className="loader-text">Loading Students…</p>
      </div>
    </div>
  );
};

export default Loader;
