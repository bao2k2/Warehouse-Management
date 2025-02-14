import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="not-found container">
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-title">404 - Not Found</h1>
        <p className="not-found-text">
          Oops! The page you are looking for could not be found.
        </p>
        <p className="not-found-text">
          You may want to return to the <Link to="/">Login</Link>.
        </p>
      </div>
    </div>
  </div>
);

export default NotFound;
