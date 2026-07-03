import DashboardLayout from "../components/layout/DashboardLayout";
import Statcard from "../components/dashboard/Statcard";
import RecentCustomers from "../components/dashboard/RecentCustomers";
import FollowupTable from "../components/dashboard/FollowupTable";

function Dashboard() {
    return (
        <DashboardLayout>
            <div className="space-y-6">

                <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        Dashboard
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Welcome to FollowUp CRM
                    </p>
                </div>

                <Statcard />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    <RecentCustomers />

                    <FollowupTable />

                </div>

            </div>
        </DashboardLayout>
    );
}

export default Dashboard;