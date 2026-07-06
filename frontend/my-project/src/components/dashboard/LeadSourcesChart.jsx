import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#f43f5e', '#06b6d4'];

function LeadSourcesChart({ data = [] }) {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    const chartData = data.map(item => ({
        ...item,
        percentage: total > 0 ? Math.round((item.value / total) * 100) : 0
    }));

    return (
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-lg font-semibold text-slate-800">Recent Lead Sources</h2>
                    <p className="text-sm text-slate-500">{total} total leads</p>
                </div>
                <button className="text-sm font-medium text-blue-600 hover:text-blue-700">Details &gt;</button>
            </div>
            
            <div className="flex justify-center h-48">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={2}
                            dataKey="value"
                            stroke="none"
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            
            <div className="mt-6 space-y-3">
                {chartData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                            <span className="text-slate-600">{item.name}</span>
                        </div>
                        <div className="flex gap-4">
                            <span className="font-semibold text-slate-700">{item.value}</span>
                            <span className="text-slate-400 w-8 text-right">{item.percentage}%</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default LeadSourcesChart;
