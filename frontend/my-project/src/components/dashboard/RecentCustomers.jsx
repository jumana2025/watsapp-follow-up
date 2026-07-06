import { Link } from "react-router-dom";

function RecentCustomers({ customers, loading }) {
    if (loading) {
        return (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col items-center justify-center min-h-[300px]">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-slate-500 mt-4 text-sm">Loading recent customers...</p>
            </div>
        );
    }

    const getInitials = (name) => {
        return name ? name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) : "?";
    };

    const getRandomColor = (name) => {
        const colors = ["bg-blue-600", "bg-purple-600", "bg-rose-500", "bg-amber-500", "bg-emerald-600", "bg-indigo-600"];
        const index = name ? name.charCodeAt(0) % colors.length : 0;
        return colors[index];
    };

    const getStatusStyle = (status) => {
        if (status === "INTERESTED") return "text-emerald-500 bg-emerald-50 border-emerald-200";
        if (status === "NEW") return "text-blue-500 bg-blue-50 border-blue-200";
        if (status === "CLOSED") return "text-slate-500 bg-slate-50 border-slate-200";
        if (status === "NOT_INTERESTED") return "text-rose-500 bg-rose-50 border-rose-200";
        if (status === "CONTACTED") return "text-indigo-500 bg-indigo-50 border-indigo-200";
        if (status === "FOLLOWUP") return "text-amber-500 bg-amber-50 border-amber-200";
        return "text-blue-500 bg-blue-50 border-blue-200";
    };

    const getStatusLabel = (status) => {
        const map = {
            NEW: "New",
            CONTACTED: "Contacted",
            FOLLOWUP: "Follow-up",
            INTERESTED: "Interested",
            NOT_INTERESTED: "Not Interested",
            CLOSED: "Closed"
        };
        return map[status] || status;
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h2 className="text-lg font-bold text-slate-800">Recent Customers</h2>
                <Link to="/customers" className="text-sm font-semibold text-blue-600 hover:text-blue-700">View All</Link>
            </div>
            
            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider text-left">
                            <th className="px-6 py-4">Customer</th>
                            <th className="px-6 py-4">Phone</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Added</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                        {customers && customers.length > 0 ? (
                            customers.map((customer) => (
                                <tr key={customer.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`flex h-9 w-9 items-center justify-center rounded-full text-white text-xs font-semibold ${getRandomColor(customer.name)}`}>
                                                {getInitials(customer.name)}
                                            </div>
                                            <div>
                                                <div className="font-semibold text-slate-800">{customer.name}</div>
                                                <div className="text-xs text-slate-400">{customer.company || "-"}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-slate-600">{customer.phone}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider ${getStatusStyle(customer.status)}`}>
                                            {getStatusLabel(customer.status)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                                        {new Date(customer.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="px-6 py-10 text-center text-slate-500 font-medium">No customers added yet.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default RecentCustomers;