import { Outlet } from "react-router-dom"
import HeaderComponent from "./HeaderComponent"
import { ToastContainer } from 'react-toastify';

const Layout = () => {
    return (
    <>
        <HeaderComponent/>
        <main>
          <Outlet />    
          <ToastContainer/>
        </main>
    </>
  )
}

export default Layout