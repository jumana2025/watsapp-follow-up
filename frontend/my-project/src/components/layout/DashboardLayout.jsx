import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function DashboardLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="flex min-h-screen bg-slate-100 overflow-hidden">

            <Sidebar isSidebarOpen={isSidebarOpen} />

            <div className="flex-1 flex flex-col h-screen overflow-y-auto">

                <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

                <main className="p-6 xl:p-10 flex-1">
                    {children}
                </main>

            </div>

        </div>
    );
}

export default DashboardLayout;