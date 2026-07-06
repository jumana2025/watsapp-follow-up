import React from 'react';

function FollowUpTable({
    followups,
    onEdit,
    onDelete,
    onMarkDone,
}) {
    const hasActions = Boolean(onEdit || onDelete || onMarkDone);

    const getStatusStyles = (status) => {
        const normalized = (status || "").toUpperCase();
        if (normalized === "COMPLETED") {
            return "border border-emerald-200 text-emerald-600 bg-emerald-50/50";
        }
        return "border border-orange-200 text-orange-600 bg-orange-50/50";
    };

    const getPriorityStyles = (priority) => {
        const p = (priority || "Medium").toLowerCase();
        if (p === 'high') return { bg: 'bg-rose-50', text: 'text-rose-600', dot: 'bg-rose-500' };
        if (p === 'low') return { bg: 'bg-emerald-50', text: 'text-emerald-600', dot: 'bg-emerald-500' };
        return { bg: 'bg-amber-50', text: 'text-amber-600', dot: 'bg-amber-500' };
    };

    const getAvatarColor = (name) => {
        const colors = [
            'bg-blue-600', 'bg-purple-600', 'bg-rose-600', 'bg-amber-500', 
            'bg-emerald-600', 'bg-cyan-600', 'bg-indigo-600', 'bg-pink-600'
        ];
        const initial = name ? name.charCodeAt(0) : 0;
        return colors[initial % colors.length];
    };

    const formatDateTime = (date, time) => {
        if (!date) return { d: "-", t: "" };
        const parsedDate = new Date(`${date}T${time || "00:00"}`);
        const formattedDate = parsedDate.toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
        const formattedTime = time
            ? parsedDate.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
            }).toLowerCase()
            : "";
        return { d: formattedDate, t: formattedTime };
    };

    const getInitials = (name) => {
        return name ? name.trim()[0].toUpperCase() : "?";
    };

    return (
        <div className="overflow-x-auto rounded-3xl bg-white shadow-sm border border-slate-100">
            <table className="min-w-full divide-y divide-slate-100">
                <thead className="bg-white">
                    <tr>
                        <th className="px-6 py-5 text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider">Customer</th>
                        <th className="px-6 py-5 text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider">Date & Time</th>
                        <th className="px-6 py-5 text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider">Notes</th>
                        <th className="px-6 py-5 text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider">Priority</th>
                        <th className="px-6 py-5 text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider">Next Follow-up</th>
                        <th className="px-6 py-5 text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-5 text-right text-[11px] font-bold text-slate-400 uppercase tracking-wider">Action</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-slate-50">
                    {followups.length > 0 ? (
                        followups.map((followup) => {
                            const dt = formatDateTime(followup.follow_up_date || followup.followup_date, followup.follow_up_time);
                            const nextDt = formatDateTime(followup.next_follow_up_date, null);
                            const pStyles = getPriorityStyles(followup.priority);
                            const isCompleted = (followup.status || "").toUpperCase() === "COMPLETED";

                            return (
                                <tr key={followup.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <div className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold text-white ${getAvatarColor(followup.customer_name)}`}>
                                                {getInitials(followup.customer_name)}
                                            </div>
                                            <div className="font-semibold text-slate-700 text-sm">{followup.customer_name}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-slate-600">{dt.d}</div>
                                        {dt.t && <div className="text-[13px] text-slate-400 mt-0.5">{dt.t}</div>}
                                    </td>
                                    <td className="px-6 py-4 max-w-[200px] truncate text-sm text-slate-500">
                                        {followup.notes || "No notes provided"}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[13px] font-medium ${pStyles.bg} ${pStyles.text}`}>
                                            <span className={`h-1.5 w-1.5 rounded-full ${pStyles.dot}`}></span>
                                            {followup.priority || "Medium"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                        {nextDt.d}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex rounded-full px-3 py-1 text-[13px] font-semibold ${getStatusStyles(followup.status)}`}>
                                            {isCompleted ? 'Completed' : 'Pending'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        {!isCompleted && (
                                            <button
                                                onClick={() => onMarkDone && onMarkDone(followup)}
                                                className="inline-flex items-center justify-center rounded-full bg-blue-600 px-4 py-1.5 text-[13px] font-semibold text-white shadow-sm transition hover:bg-blue-700"
                                            >
                                                <svg className="mr-1.5 h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                Mark Done
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan={7} className="px-6 py-10 text-center text-slate-500">
                                No follow-ups found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default FollowUpTable;