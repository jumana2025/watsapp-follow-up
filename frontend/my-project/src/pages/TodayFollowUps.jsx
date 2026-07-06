import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import FollowUpTable from "../components/followups/FollowupTable";
import { getTodayFollowUps } from "../services/dashboardService";
import { updateFollowUp } from "../services/followupService";

function TodayFollowUps() {
    const [followups, setFollowups] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadToday = async () => {
        try {
            const data = await getTodayFollowUps();
            setFollowups(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadToday();
    }, []);

    const handleMarkDone = async (followup) => {
        try {
            await updateFollowUp(followup.id, {
                ...followup,
                status: "completed",
            });
            loadToday();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Today's Follow-ups</h1>
                    <p className="mt-2 text-sm text-slate-500">All follow-ups scheduled for today.</p>
                </div>

                <div className="rounded-4xl bg-white p-6 shadow-sm">
                    {loading ? (
                        <p className="text-sm text-slate-500">Loading today's follow-ups...</p>
                    ) : (
                        <FollowUpTable
                            followups={followups}
                            onMarkDone={handleMarkDone}
                        />
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}

export default TodayFollowUps;
