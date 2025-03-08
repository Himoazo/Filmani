import { Outlet } from "react-router-dom"
import HeaderComponent from "./HeaderComponent"

const Layout = () => {
    return (
    <>
        <HeaderComponent/>
        <main>
        <Outlet/>    
        </main>
    </>
  )
}

export default Layout