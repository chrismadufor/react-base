import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const linkClass =
  "px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors";
const activeClass = "bg-gray-200";
const mobileLinkClass =
  "block px-4 py-3 text-sm font-medium hover:bg-gray-100 transition-colors border-b border-gray-200";

export default function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="w-full bg-white border-b sticky top-0 z-50 relative">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="text-lg font-bold text-gray-900">
          React Base
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : ""}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/users"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : ""}`
            }
          >
            Users
          </NavLink>
          <NavLink
            to="/posts"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : ""}`
            }
          >
            Posts
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : ""}`
            }
          >
            Contact
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-2 text-gray-700 hover:text-gray-900 focus:outline-none"
          aria-label="Toggle menu"
        >
          <FontAwesomeIcon
            icon={isMobileMenuOpen ? faTimes : faBars}
            className="text-xl"
          />
        </button>
      </div>

      {/* Mobile Menu - Slides down from top, fixed position */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-white border-b shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "max-h-96 opacity-100"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col">
          <NavLink
            to="/"
            end
            onClick={closeMobileMenu}
            className={({ isActive }) =>
              `${mobileLinkClass} ${isActive ? activeClass : ""}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/users"
            onClick={closeMobileMenu}
            className={({ isActive }) =>
              `${mobileLinkClass} ${isActive ? activeClass : ""}`
            }
          >
            Users
          </NavLink>
          <NavLink
            to="/posts"
            onClick={closeMobileMenu}
            className={({ isActive }) =>
              `${mobileLinkClass} ${isActive ? activeClass : ""}`
            }
          >
            Posts
          </NavLink>
          <NavLink
            to="/contact"
            onClick={closeMobileMenu}
            className={({ isActive }) =>
              `${mobileLinkClass} ${isActive ? activeClass : ""}`
            }
          >
            Contact
          </NavLink>
        </div>
      </div>
    </nav>
  );
}


