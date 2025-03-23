import React from "react";
import AdminNavbar from "@/components/navbars/admin-navbar";

interface LayoutProps {
    children : React.ReactNode
}

const Layout = ({children} : LayoutProps) => {
    return (
        <div>
            <AdminNavbar/>
            <main>
                {children}
            </main>
        </div>
    )
}

export default Layout