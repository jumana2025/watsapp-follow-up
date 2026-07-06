function PipelineOverview({ pipeline = {} }) {
    const { new: newCount = 0, interested = 0, not_interested = 0, closed = 0 } = pipeline;
    const total = newCount + interested + not_interested + closed;

    const bars = [
        { label: "New", value: newCount, color: "bg-blue-600" },
        { label: "Interested", value: interested, color: "bg-emerald-500" },
        { label: "Not Interested", value: not_interested, color: "bg-rose-500" },
        { label: "Closed", value: closed, color: "bg-slate-400" },
    ];

    return (
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
            <h2 className="text-lg font-semibold text-slate-800 mb-6">Pipeline Overview</h2>
            
            <div className="space-y-5">
                {bars.map((bar, i) => (
                    <div key={i}>
                        <div className="flex justify-between text-sm mb-2">
                            <span className="font-medium text-slate-600">{bar.label}</span>
                            <span className="font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{bar.value}</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div 
                                className={`h-full ${bar.color} rounded-full`}
                                style={{ width: total > 0 ? `${(bar.value / total) * 100}%` : '0%' }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default PipelineOverview;
