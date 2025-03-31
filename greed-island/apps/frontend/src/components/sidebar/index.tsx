import React from "react";
import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {UserButton} from "@clerk/nextjs";
import AppSidebar from "@/components/sidebar/app-sidebar";

const Sidebar = ({children} : {children : React.ReactNode}) => {
    return <SidebarProvider>
        <AppSidebar/>
        <SidebarInset className={"bg-black"}>
            <header className="flex h-16 shrink-0 items-center gap-2 justify-between">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1 text-white hover:text-white hover:bg-[#272729]"/>
                </div>
                <div className="mr-4">
                    <UserButton/>
                </div>
            </header>
            <div className="min-h-[100vh] flex-1 m-4 rounded-xl bg-[#18181a] md:min-h-min">
                {children}
            </div>
        </SidebarInset>
    </SidebarProvider>
}

export default Sidebar