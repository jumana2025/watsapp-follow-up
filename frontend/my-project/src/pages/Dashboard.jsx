import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import Statcard from "../components/dashboard/Statcard";
import FollowupTable from "../components/dashboard/FollowupTable";
import LeadSourcesChart from "../components/dashboard/LeadSourcesChart";
import PipelineOverview from "../components/dashboard/PipelineOverview";
import AddCustomerBanner from "../components/dashboard/AddCustomerBanner";
import RecentCustomers from "../components/dashboard/RecentCustomers";
import { getDashboardStats, getTodayFollowUps } from "../services/dashboardService";
import { updateFollowUp } from "../services/followupService";
import { getCustomers } from "../services/customerService";

function Dashboard() {
    const [stats, setStats] = useState({
        total_customers: 0,
        total_followups: 0,
        pending_followups: 0,
        completed_followups: 0,
        today_followups: 0,
        pipeline: {},
        lead_sources: [],
    });
    const [todayFollowUps, setTodayFollowUps] = useState([]);
    const [recentCustomers, setRecentCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                const [statsData, todayData, customersData] = await Promise.all([
                    getDashboardStats(),
                    getTodayFollowUps(),
                    getCustomers(),
                ]);

                setStats(statsData);
                setTodayFollowUps(todayData);
                setRecentCustomers(customersData.slice(0, 5));
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        loadDashboard();
    }, []);

    const statItems = useMemo(
        () => [
            { 
                title: "Total Customers", 
                value: stats.total_customers, 
                topColor: "bg-blue-500", 
                icon: "👥",
                iconColor: "text-blue-500 bg-blue-50",
                pillText: "+5% this week",
                pillColor: "text-emerald-600 bg-emerald-50"
            },
            { 
                title: "Pending Follow-ups", 
                value: stats.pending_followups, 
                topColor: "bg-rose-500", 
                icon: "📋", 
                iconColor: "text-rose-500 bg-rose-50",
                pillText: "Requires attention",
                pillColor: "text-rose-600 bg-rose-50"
            },
            { 
                title: "Today's Follow-ups", 
                value: stats.today_followups, 
                topColor: "bg-amber-500", 
                icon: "📅", 
                iconColor: "text-amber-500 bg-amber-50",
                pillText: "Scheduled today",
                pillColor: "text-rose-600 bg-rose-50"
            },
            { 
                title: "Completed Follow-ups", 
                value: stats.completed_followups, 
                topColor: "bg-emerald-500", 
                icon: "✓", 
                iconColor: "text-emerald-500 bg-emerald-50",
                pillText: "+12% this month",
                pillColor: "text-emerald-600 bg-emerald-50"
            },
        ],
        [stats],
    );

    const handleMarkDone = async (followup) => {
        try {
            await updateFollowUp(followup.id, {
                ...followup,
                status: "completed",
            });
            const todayData = await getTodayFollowUps();
            setTodayFollowUps(todayData);
            
            const statsData = await getDashboardStats();
            setStats(statsData);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <Statcard stats={statItems} loading={loading} />

                <div className="grid grid-cols-1 gap-6 xl:grid-cols-[2fr_1fr]">
                    <div className="space-y-6">
                        <FollowupTable followups={todayFollowUps.filter((item) => (item.status || "").toLowerCase() === "pending")} loading={loading} onMarkDone={handleMarkDone} />
                        <RecentCustomers customers={recentCustomers} loading={loading} />
                    </div>

                    <div className="space-y-6">
                        <LeadSourcesChart data={stats.lead_sources || []} />
                        <AddCustomerBanner />
                        <PipelineOverview pipeline={stats.pipeline || {}} />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default Dashboard;