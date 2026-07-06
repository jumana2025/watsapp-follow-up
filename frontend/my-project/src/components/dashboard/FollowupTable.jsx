import { Link } from "react-router-dom";

function FollowupTable({ followups = [], loading = false, onMarkDone }) {
    const getInitials = (name) => {
        return name ? name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) : "?";
    };

    const getRandomColor = (name) => {
        const colors = ["bg-blue-500", "bg-purple-500", "bg-rose-500", "bg-amber-500", "bg-emerald-500"];
        const index = name ? name.charCodeAt(0) % colors.length : 0;
        return colors[index];
    };

    const getPriorityColor = (priority) => {
        if (priority === "High") return "text-rose-600 bg-rose-50 border-rose-200";
        if (priority === "Medium") return "text-amber-600 bg-amber-50 border-amber-200";
        return "text-emerald-600 bg-emerald-50 border-emerald-200";
    };

    return (
        <div className="rounded-2xl bg-white shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <div>
                    <h2 className="text-lg font-semibold text-slate-800">Today's Critical Follow-ups</h2>
                    <p className="text-sm text-slate-500">{followups.length} pending &bull; {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
                </div>
                <Link to="/followups" className="text-sm font-medium text-blue-600 bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100">
                    View All &nearr;
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            <th className="p-4 pl-6">Customer</th>
                            <th className="p-4">Company</th>
                            <th className="p-4">Product</th>
                            <th className="p-4 text-center">Priority</th>
                            <th className="p-4">Time</th>
                            <th className="p-4 pr-6 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                        {loading ? (
                            <tr><td colSpan="6" className="p-6 text-center text-slate-500">Loading...</td></tr>
                        ) : followups.length === 0 ? (
                            <tr><td colSpan="6" className="p-6 text-center text-slate-500">No critical follow-ups today.</td></tr>
                        ) : (
                            followups.map(item => (
                                <tr key={item.id} className="hover:bg-slate-50">
                                    <td className="p-4 pl-6">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${getRandomColor(item.customer_name)}`}>
                                                {getInitials(item.customer_name)}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-slate-800">{item.customer_name}</p>
                                                <p className="text-xs text-slate-400">{item.customer_phone}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 text-slate-600">{item.customer_company || "-"}</td>
                                    <td className="p-4 text-slate-600">{item.customer_product_service || "-"}</td>
                                    <td className="p-4 text-center">
                                        <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${getPriorityColor(item.priority)}`}>
                                            <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                                            {item.priority || "Medium"}
                                        </span>
                                    </td>
                                    <td className="p-4 text-slate-600 text-xs">
                                        {item.follow_up_time}
                                    </td>
                                    <td className="p-4 pr-6">
                                        <div className="flex items-center justify-center gap-2">
                                            <button 
                                                onClick={() => window.open(`https://wa.me/${item.customer_phone}`, "_blank")}
                                                className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-600 hover:bg-emerald-100"
                                            >
                                                WhatsApp
                                            </button>
                                            <button 
                                                onClick={() => onMarkDone && onMarkDone(item)}
                                                className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 shadow-sm"
                                            >
                                                <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                                Done
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default FollowupTable;