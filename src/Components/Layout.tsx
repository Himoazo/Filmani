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
        <footer className="bg-slate-800 text-white p-4 shadow-md text-center">
          <p>© {new Date().getFullYear()} Filmani. All rights reserved.</p> 
        </footer>
    </>
  )
}

export default Layout