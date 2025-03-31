import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton
} from "@/components/ui/sidebar";
import {ComputerIcon, Sparkles, UserIcon} from "lucide-react";
import Link from "next/link";

const AppSidebar = () => {
    return <Sidebar collapsible={"icon"} className={"gap-4"}>
        <SidebarHeader className="bg-[#18181a] flex items-center p-2">
            <div className={"flex items-center space-x-2"}>
                <div className={"relative w-8 h-8"}>
                    <div
                        className={"absolute inset-0 bg-gradient-to-r from-pink-500 to-cyan-500 rounded-lg rotate-45 transform-gpu"}>
                    </div>
                    <div className={"absolute inset-1 bg-black rounded-lg rotate-45 flex items-center justify-center"}>
                        <Sparkles className={"h-3 w-3 text-white"}/>
                    </div>
                </div>
                <span
                    className={"font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-cyan-500"}>
                    PixelVerse
                </span>
            </div>
        </SidebarHeader>
        <SidebarContent className="bg-[#18181a] text-white">
            <SidebarGroup>
                <SidebarMenu>
                    <SidebarMenuButton className={"transition duration-200 hover:bg-[#272729] hover:text-white cursor-pointer"}>
                        <ComputerIcon/>
                        <p>Spaces</p>
                    </SidebarMenuButton>
                    <SidebarMenuButton className={"transition duration-200 hover:bg-[#272729] hover:text-white cursor-pointer"}>
                        <UserIcon/>
                        <p>Profile</p>
                    </SidebarMenuButton>
                </SidebarMenu>
            </SidebarGroup>
        </SidebarContent>
    </Sidebar>
}

export default AppSidebar