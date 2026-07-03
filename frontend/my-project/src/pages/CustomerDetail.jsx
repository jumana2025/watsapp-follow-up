import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import FollowUpForm from "../components/followups/FollowupForm";
import FollowUpTable from "../components/followups/FollowupTable";
import { getCustomer } from "../services/customerService";
import {
    getFollowUpsByCustomer,
    createFollowUp,
    updateFollowUp,
    deleteFollowUp,
} from "../services/followupService";

function CustomerDetail() {
    const { id } = useParams();
    const [customer, setCustomer] = useState(null);
    const [followups, setFollowups] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingFollowUp, setEditingFollowUp] = useState(null);

    useEffect(() => {
        if (id) {
            fetchCustomer();
            fetchFollowups();
        }
    }, [id]);

    const fetchCustomer = async () => {
        try {
            const data = await getCustomer(id);
            setCustomer(data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchFollowups = async () => {
        try {
            const data = await getFollowUpsByCustomer(id);
            setFollowups(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSave = async (followup) => {
        try {
            const payload = {
                ...followup,
                customer: Number(id),
                status: followup.status.toUpperCase(),
            };

            if (editingFollowUp) {
                await updateFollowUp(editingFollowUp.id, payload);
            } else {
                await createFollowUp(payload);
            }

            setShowForm(false);
            setEditingFollowUp(null);
            fetchFollowups();
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (followup) => {
        setEditingFollowUp(followup);
        setShowForm(true);
    };

    const handleDelete = async (followupId) => {
        if (!window.confirm("Delete this follow-up?")) return;

        try {
            await deleteFollowUp(followupId);
            fetchFollowups();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <DashboardLayout>
            <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Customer Details</h1>
                    <p className="text-gray-500 mt-1">View customer information and follow-up history.</p>
                </div>
                <Link
                    to="/customers"
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
                >
                    Back to Customers
                </Link>
            </div>

            {!customer ? (
                <div className="bg-white rounded-lg shadow p-6 text-gray-500">Loading customer...</div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 mb-6">
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
                        <p className="mb-2"><span className="font-semibold">Name:</span> {customer.name}</p>
                        <p className="mb-2"><span className="font-semibold">Phone:</span> {customer.phone}</p>
                        <p className="mb-2"><span className="font-semibold">Email:</span> {customer.email}</p>
                        <p className="mb-2"><span className="font-semibold">Company:</span> {customer.company}</p>
                        <p className="mb-2"><span className="font-semibold">Status:</span> {customer.status}</p>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold">Follow-up History</h2>
                            <button
                                onClick={() => {
                                    setEditingFollowUp(null);
                                    setShowForm(true);
                                }}
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                            >
                                + Add Follow Up
                            </button>
                        </div>
                        <FollowUpTable
                            followups={followups}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    </div>
                </div>
            )}

            <FollowUpForm
                isOpen={showForm}
                onClose={() => {
                    setShowForm(false);
                    setEditingFollowUp(null);
                }}
                onSave={handleSave}
                followup={editingFollowUp}
                customers={customer ? [customer] : []}
            />
        </DashboardLayout>
    );
}

export default CustomerDetail;
