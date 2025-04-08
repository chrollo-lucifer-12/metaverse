

import Sidebar from "@/components/sidebar";

const Layout = async ({children} : {children : React.ReactNode}) => {



    return (
        <div className="flex h-screen w-screen bg-black text-white">
            <Sidebar children={children} />
        </div>
    )
}

export default Layout