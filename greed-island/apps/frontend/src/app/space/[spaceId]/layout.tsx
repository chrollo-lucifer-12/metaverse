import React from "react";


const Layout = async ({children, params} : {children : React.ReactNode, params : {spaceId : string}}) => {
    return (
        <main>
            {children}
        </main>
    )
}

export default Layout