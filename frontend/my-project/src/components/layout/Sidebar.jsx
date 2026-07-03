import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <div className="w-64 bg-green-700 text-white min-h-screen p-5">

            <h1 className="text-2xl font-bold mb-10">
                FollowUp CRM
            </h1>

            <nav className="space-y-4">

                <Link
                    to="/dashboard"
                    className="block hover:bg-green-600 p-3 rounded"
                >
                    Dashboard
                </Link>

                <Link
                    to="/customers"
                    className="block hover:bg-green-600 p-3 rounded"
                >
                    Customers
                </Link>

                <Link
                    to="/followups"
                    className="block hover:bg-green-600 p-3 rounded"
                >
                    Follow-ups
                </Link>

                <Link
                    to="/reports"
                    className="block hover:bg-green-600 p-3 rounded"
                >
                    Reports
                </Link>

            </nav>
        </div>
    );
}

export default Sidebar;