function Statcard({ stats = [], loading = false }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {stats.map((item, index) => (
                <div
                    key={index}
                    className="relative rounded-2xl bg-white p-6 shadow-sm border border-slate-100 overflow-hidden"
                >
                    {/* Top color border */}
                    <div className={`absolute top-0 left-0 w-full h-1.5 ${item.topColor}`}></div>
                    
                    <div className="flex justify-between items-start mb-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${item.iconColor}`}>
                            {item.icon}
                        </div>
                        {item.pillText && (
                            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${item.pillColor}`}>
                                {item.pillText}
                            </span>
                        )}
                    </div>
                    
                    <div>
                        <h3 className="text-3xl font-bold text-slate-800">
                            {loading ? "—" : item.value}
                        </h3>
                        <p className="mt-1 text-sm font-medium text-slate-500">
                            {item.title}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Statcard;