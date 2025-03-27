import React from "react"

type Props = {
    children : React.ReactNode
}

const Layout = async ({children} : Props) => {



    return <div className="flex flex-col xl:px-0">
        {children}
    </div>
}

export default Layout