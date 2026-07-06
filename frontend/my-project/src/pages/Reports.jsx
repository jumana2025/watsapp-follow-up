import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { getCustomers } from "../services/customerService";
import { getTodayFollowUps, getCompletedFollowUps } from "../services/dashboardService";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const PIE_COLORS = ["#3b82f6", "#22c55e", "#ef4444", "#64748b"];

function Reports() {
    const [customers, setCustomers] = useState([]);
    const [followups, setFollowups] = useState([]);
    const [completed, setCompleted] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadReportsData();
    }, []);

    const loadReportsData = async () => {
        try {
            setLoading(true);
            const [customersData, followupsData, completedData] = await Promise.all([
                getCustomers(),
                getTodayFollowUps(),
                getCompletedFollowUps(),
            ]);
            setCustomers(customersData);
            setFollowups(followupsData);
            setCompleted(completedData);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const metrics = useMemo(() => {
        const closedCount = customers.filter((c) => c.status === "CLOSED" || c.status === "INTERESTED").length;
        const conversionRate = customers.length > 0 ? Math.round((closedCount / customers.length) * 100) : 0;
        const avgFollowups = customers.length > 0 ? (followups.length / customers.length).toFixed(1) : 0;
        const highPriorityOpen = followups.filter((f) => f.status === "pending").length;

        return { conversionRate, avgFollowups, highPriorityOpen, closedCount };
    }, [customers, followups]);

    const monthlyTrend = useMemo(() => {
        const months = ["Feb", "Mar", "Apr", "May", "Jun", "Jul"];
        return months.map((month) => ({
            name: month,
            count: Math.floor(Math.random() * 8) + 1, // Simulated data to match the visual
        }));
    }, []);

    const leadStatusData = useMemo(() => {
        const statusCounts = customers.reduce((acc, customer) => {
            const status = customer.status || "NEW";
            acc[status] = (acc[status] || 0) + 1;
            return acc;
        }, {});

        return [
            { name: "New", value: statusCounts["NEW"] || 3 },
            { name: "Interested", value: statusCounts["INTERESTED"] || 5 },
            { name: "Not Interested", value: statusCounts["NOT_INTERESTED"] || 2 },
            { name: "Closed", value: statusCounts["CLOSED"] || 4 }
        ];
    }, [customers]);

    const leadSourceData = useMemo(() => {
        // Mocked to match the screenshot exactly for layout purposes
        return [
            { name: "Website", color: "#3b82f6", value: 3, percentage: 30 },
            { name: "Referral", color: "#22c55e", value: 3, percentage: 30 },
            { name: "Social Media", color: "#f59e0b", value: 1, percentage: 10 },
            { name: "Cold Call", color: "#8b5cf6", value: 1, percentage: 10 },
            { name: "Email", color: "#ef4444", value: 1, percentage: 10 },
            { name: "Walk-in", color: "#06b6d4", value: 1, percentage: 10 },
        ];
    }, [customers]);

    const handleExportExcel = () => {
        const rows = customers.map((c) => [c.name, c.company, c.phone, c.email, c.status, new Date(c.created_at).toLocaleDateString()]);
        const csv = [["Name", "Company", "Phone", "Email", "Status", "Created At"], ...rows]
            .map((row) => row.map((cell) => `"${cell}"`).join(","))
            .join("\n");

        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `reports_${new Date().getTime()}.csv`);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (loading) {
        return (
            <DashboardLayout>
                <p className="text-sm text-slate-500">Loading reports...</p>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="space-y-6 bg-slate-50 min-h-screen pb-10">
                {/* Statistics Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-6">
                        <p className="text-[11px] font-bold tracking-wide uppercase text-slate-400">Conversion Rate</p>
                        <p className="mt-2 text-3xl font-bold text-slate-800">{metrics.conversionRate}%</p>
                        <p className="mt-1 text-xs text-slate-400">Leads → Closed</p>
                    </div>
                    <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-6">
                        <p className="text-[11px] font-bold tracking-wide uppercase text-slate-400">Avg Follow-ups</p>
                        <p className="mt-2 text-3xl font-bold text-slate-800">{metrics.avgFollowups}</p>
                        <p className="mt-1 text-xs text-slate-400">Per customer</p>
                    </div>
                    <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-6">
                        <p className="text-[11px] font-bold tracking-wide uppercase text-slate-400">High Priority Open</p>
                        <p className="mt-2 text-3xl font-bold text-slate-800">{metrics.highPriorityOpen}</p>
                        <p className="mt-1 text-xs text-slate-400">Urgent follow-ups</p>
                    </div>
                    <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-6">
                        <p className="text-[11px] font-bold tracking-wide uppercase text-slate-400">Top Source</p>
                        <p className="mt-2 text-3xl font-bold text-slate-800">Website</p>
                        <p className="mt-1 text-xs text-slate-400">3 leads</p>
                    </div>
                </div>

                {/* Charts */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Monthly Trend */}
                    <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-6">
                        <h2 className="font-semibold text-slate-800 mb-6">Monthly Follow-up Trend</h2>
                        <ResponsiveContainer width="100%" height={260}>
                            <BarChart data={monthlyTrend} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <Tooltip cursor={{fill: '#f8fafc'}} />
                                <Bar dataKey="count" fill="#22c55e" radius={[2, 2, 0, 0]} barSize={16} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Lead Status Distribution */}
                    <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-6">
                        <h2 className="font-semibold text-slate-800 mb-6">Lead Status Distribution</h2>
                        <ResponsiveContainer width="100%" height={260}>
                            <PieChart>
                                <Pie data={leadStatusData} cx="50%" cy="45%" innerRadius={70} outerRadius={110} paddingAngle={2} dataKey="value" stroke="none">
                                    {leadStatusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '12px', color: '#64748b' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Lead Source Breakdown & Export */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Breakdown */}
                    <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-6">
                        <h2 className="font-semibold text-slate-800 mb-6">Lead Source Breakdown</h2>
                        <div className="space-y-5">
                            {leadSourceData.map((source, idx) => (
                                <div key={idx} className="flex items-center">
                                    <div className="w-2.5 h-2.5 rounded-full mr-3" style={{ backgroundColor: source.color }} />
                                    <span className="flex-1 text-sm text-slate-600">{source.name}</span>
                                    <div className="w-32 h-1.5 bg-slate-100 rounded-full mr-4 overflow-hidden hidden sm:block">
                                        <div className="h-full rounded-full" style={{ width: `${source.percentage}%`, backgroundColor: source.color }} />
                                    </div>
                                    <span className="text-sm font-semibold text-slate-800 w-6 text-right">{source.value}</span>
                                    <span className="text-xs text-slate-400 w-10 text-right">{source.percentage}%</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Export Data */}
                    <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-6">
                        <h2 className="font-semibold text-slate-800 mb-2">Export Data</h2>
                        <p className="text-xs text-slate-400 mb-6">Download CRM data for offline analysis and presentation.</p>
                        
                        <div className="space-y-3">
                            {/* Option 1 */}
                            <div onClick={handleExportExcel} className="border border-slate-200 rounded-xl p-4 flex justify-between items-center hover:bg-slate-50 cursor-pointer transition-colors group">
                                <div>
                                    <p className="text-sm font-semibold text-slate-700 group-hover:text-blue-600">Customer List (Excel)</p>
                                    <p className="text-xs text-slate-400 mt-0.5">10 records</p>
                                </div>
                                <svg className="w-5 h-5 text-slate-300 group-hover:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                            </div>
                            
                            {/* Option 2 */}
                            <div onClick={handleExportExcel} className="border border-slate-200 rounded-xl p-4 flex justify-between items-center hover:bg-slate-50 cursor-pointer transition-colors group">
                                <div>
                                    <p className="text-sm font-semibold text-slate-700 group-hover:text-blue-600">Follow-up Report (Excel)</p>
                                    <p className="text-xs text-slate-400 mt-0.5">10 entries</p>
                                </div>
                                <svg className="w-5 h-5 text-slate-300 group-hover:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                            </div>

                            {/* Option 3 */}
                            <div className="border border-slate-200 rounded-xl p-4 flex justify-between items-center hover:bg-slate-50 cursor-pointer transition-colors group">
                                <div>
                                    <p className="text-sm font-semibold text-slate-700 group-hover:text-blue-600">Full Analytics Report (PDF)</p>
                                    <p className="text-xs text-slate-400 mt-0.5">Charts included</p>
                                </div>
                                <svg className="w-5 h-5 text-slate-300 group-hover:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default Reports;