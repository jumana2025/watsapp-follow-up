import { useLocation } from "react-router-dom";

function Navbar({ toggleSidebar }) {
    const location = useLocation();

    const getPageInfo = () => {
        const path = location.pathname.toLowerCase();
        if (path.includes('dashboard')) return { title: "Dashboard", subtitle: "Overview of your CRM" };
        if (path.includes('customers')) return { title: "Customers", subtitle: "Manage your client base" };
        if (path.includes('today-followups')) return { title: "Today's Follow-ups", subtitle: "Scheduled for today" };
        if (path.includes('completed-followups')) return { title: "Completed Follow-ups", subtitle: "History of completed tasks" };
        if (path.includes('followups')) return { title: "All Follow-ups", subtitle: "Track all customer conversations" };
        if (path.includes('reports')) return { title: "Reports", subtitle: "Analytics and insights" };
        return { title: "Dashboard", subtitle: "Overview" };
    };

    const { title, subtitle } = getPageInfo();

    return (
        <div className="bg-white shadow px-6 py-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between sticky top-0 z-10">
            <div className="flex items-center gap-4">
                <button 
                    onClick={toggleSidebar}
                    className="rounded-xl border border-slate-200 bg-white p-3 text-slate-600 hover:bg-slate-50 transition-colors"
                >
                    <span className="text-lg">☰</span>
                </button>

                <div>
                    <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
                    <p className="text-sm text-slate-500">{subtitle}</p>
                </div>
            </div>

            <div className="flex items-center gap-4 justify-end">
                <button className="relative rounded-2xl bg-slate-100 p-3 text-slate-600 hover:bg-slate-200 transition-colors">
                    {/* Notification icon can go here */}
                </button>

                <div className="rounded-2xl bg-slate-100 px-4 py-3 text-right">
                    <div className="font-semibold text-slate-900">Admin User</div>
                    <div className="text-xs text-slate-500">Administrator</div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;