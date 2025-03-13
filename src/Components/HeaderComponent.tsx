import { NavLink } from "react-router-dom"
import { useAuth } from "../Context/AuthContext"
import { Link } from "react-router-dom";
import SearchBar from "./SearchBarComponent";


const HeaderComponent = () => {
  const { user, logout } = useAuth();
  return (
    <header>
      <Link to="/"><h1 className="text-2xl font-bold tracking-wide mb-2 sm:mb-0 sm:mr-4">LOGO</h1></Link>
      <SearchBar/>
        <nav>
            <ul>
              <li> <NavLink to="/">Start</NavLink> </li>
              <li><NavLink to="/reviews">Recesnssioner</NavLink></li>
              <li>
              {!user ? (
                <NavLink to="/login" className="text-white hover:text-blue-300 transition-colors">
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
    </header>
  )
}

export default HeaderComponent