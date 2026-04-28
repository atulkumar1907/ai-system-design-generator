import { NavLink } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        
        {/* LOGO (clickable → Home) */}
        <NavLink to="/" className="navbar-logo">
          <span className="navbar-logo-text">
            Architect<span>AI</span>
          </span>
        </NavLink>

        {/* NAV LINKS */}
        <div className="navbar-links">
          
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/editor"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            Diagram Editor
          </NavLink>

          <NavLink
            to="/compare"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            Compare
          </NavLink>

          <NavLink
            to="/code"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            Code Generator
          </NavLink>

          <NavLink
            to="/saved"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            Saved Designs
          </NavLink>

        </div>

      </div>
    </nav>
  );
};