import { NavLink } from "react-router-dom"
import { useAuth } from "../Context/AuthContext"
import { Link } from "react-router-dom";
import SearchBar from "./SearchBarComponent";
import { Menu, X } from 'lucide-react';
import { useState } from "react";

const HeaderComponent = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }


  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
        
          <Link to="/" className="flex-shrink-0">
            <h1 className="text-2xl font-bold tracking-wide">LOGO</h1>
          </Link>
          
          
          <div className="hidden md:flex flex-grow mx-4 max-w-md">
            <SearchBar />
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center space-x-6">
              <li>
                <NavLink to="/" className={({ isActive }) => 
                  isActive ? "text-blue-300" : "text-white hover:text-blue-300 transition-colors"
                }>
                  Start
                </NavLink>
              </li>
              <li>
                <NavLink to="/reviews" className={({ isActive }) => 
                  isActive ? "text-blue-300" : "text-white hover:text-blue-300 transition-colors"
                }>
                  Recensioner
                </NavLink>
              </li>
              <li>
                {!user ? (
                  <NavLink to="/login" className={({ isActive }) => 
                    isActive ? "text-blue-300" : "text-white hover:text-blue-300 transition-colors"
                  }>
                    Logga in
                  </NavLink>
                ) : (
                  <button onClick={logout} className="text-white hover:text-red-300 transition-colors">
                    Logga ut
                  </button>
                )}
              </li>
            </ul>
          </nav>
          
          {/* Hmburger */}
          <button 
            className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* width 100% mobile */}
        <div className="md:hidden py-3">
          <SearchBar />
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4">
            <ul className="flex flex-col space-y-3">
              <li>
                <NavLink to="/" 
                  className={({ isActive }) => 
                    isActive ? "block text-blue-300" : "block text-white hover:text-blue-300 transition-colors"
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  Start
                </NavLink>
              </li>
              <li>
                <NavLink to="/reviews" 
                  className={({ isActive }) => 
                    isActive ? "block text-blue-300" : "block text-white hover:text-blue-300 transition-colors"
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  Recensioner
                </NavLink>
              </li>
              <li>
                {!user ? (
                  <NavLink to="/login" 
                    className={({ isActive }) => 
                      isActive ? "block text-blue-300" : "block text-white hover:text-blue-300 transition-colors"
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Logga in
                  </NavLink>
                ) : (
                  <button 
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }} 
                    className="block w-full text-left text-white hover:text-red-300 transition-colors"
                  >
                    Logga ut
                  </button>
                )}
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}

export default HeaderComponent