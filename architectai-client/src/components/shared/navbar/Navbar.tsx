import { NavLink } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

export const Navbar = () => {
  const [open, setOpen] = useState(false);

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/editor", label: "Diagram Editor" },
    { to: "/compare", label: "Compare" },
    { to: "/code", label: "Code Generator" },
    { to: "/saved", label: "Saved Designs" },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* LOGO */}
        <NavLink to="/" className="navbar-logo">
          <span className="navbar-logo-text">
            Architect<span>AI</span>
          </span>
        </NavLink>

        {/* DESKTOP NAV */}
        <div className="navbar-links">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* HAMBURGER */}
        <button
          className="hamburger"
          onClick={() => setOpen(!open)}
        >
          <span className={open ? "line open" : "line"} />
          <span className={open ? "line open" : "line"} />
          <span className={open ? "line open" : "line"} />
        </button>
      </div>

      {/* MOBILE MENU */}
      <div className={open ? "mobile-menu open" : "mobile-menu"}>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};