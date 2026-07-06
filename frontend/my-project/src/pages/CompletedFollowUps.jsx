import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { getCompletedFollowUps } from "../services/dashboardService";

function CompletedFollowUps() {
    const [followups, setFollowups] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCompleted = async () => {
            try {
                const data = await getCompletedFollowUps();
                setFollowups(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        loadCompleted();
    }, []);

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Completed Follow-ups</h1>
                    <p className="mt-2 text-sm text-slate-500">A snapshot of your successfully closed follow-ups.</p>
                </div>

                <div className="rounded-3xl bg-white p-6 shadow-sm">
                    {loading ? (
                        <p className="text-sm text-slate-500">Loading completed follow-ups...</p>
                    ) : followups.length === 0 ? (
                        <p className="text-sm text-slate-500">No completed follow-ups yet.</p>
                    ) : (
                        <div className="space-y-4">
                            {followups.map((item) => (
                                <div key={item.id} className="rounded-2xl border border-slate-200 p-4">
                                    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                                        <div>
                                            <p className="font-semibold text-slate-800">{item.customer_name}</p>
                                            <p className="text-sm text-slate-500">{item.notes || "No notes added yet"}</p>
                                        </div>
                                        <div className="text-sm text-slate-500">
                                            <p>{item.follow_up_date}</p>
                                            <p>{item.follow_up_time}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}

export default CompletedFollowUps;
