import { NavLink } from "react-router-dom"

const HeaderComponent = () => {
  return (
    <header>
        <nav>
            <ul>
              <li> <NavLink to="/">Start</NavLink> </li>
              <li><NavLink to="/reviews">Recesnssioner</NavLink></li>
              <li><NavLink to="/login">Logga in</NavLink></li>    
            </ul>      
        </nav>
    </header>
  )
}

export default HeaderComponent