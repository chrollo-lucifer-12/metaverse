"use client"
import {HouseIcon} from "lucide-react";


const AdminNavbar = () => {
    return <div className="w-full text-white flex justify-between p-3 border-b-1 border-[#1c1b1e]">
        <div className="flex items-center gap-x-3">
            <HouseIcon/>
            <p className="font-bold">Metaverse Admin</p>
        </div>
    </div>
}

export default AdminNavbar