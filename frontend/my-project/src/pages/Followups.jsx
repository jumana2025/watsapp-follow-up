import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import FollowUpForm from "../components/followups/FollowUpForm";
import FollowUpTable from "../components/followups/FollowUpTable";

import {
    getFollowUps,
    createFollowUp,
    updateFollowUp,
    deleteFollowUp,
} from "../services/followupService";
import { getCustomers } from "../services/customerService";

function FollowUps() {
    const [followups, setFollowUps] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingFollowUp, setEditingFollowUp] = useState(null);

    useEffect(() => {
        fetchFollowUps();
        fetchCustomers();
    }, []);

    const fetchFollowUps = async () => {
        try {
            const data = await getFollowUps();
            setFollowUps(data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchCustomers = async () => {
        try {
            const data = await getCustomers();
            setCustomers(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSave = async (followup) => {
        try {
            const payload = {
                ...followup,
                customer: Number(followup.customer),
                status: followup.status.toUpperCase(),
            };

            if (editingFollowUp) {
                await updateFollowUp(editingFollowUp.id, payload);
            } else {
                await createFollowUp(payload);
            }

            setShowForm(false);
            setEditingFollowUp(null);

            fetchFollowUps();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this follow-up?")) return;

        try {
            await deleteFollowUp(id);
            fetchFollowUps();
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (followup) => {
        setEditingFollowUp(followup);
        setShowForm(true);
    };

    return (
        <DashboardLayout>

            <div className="flex justify-between items-center mb-6">

                <div>
                    <h1 className="text-3xl font-bold">
                        Follow Ups
                    </h1>

                    <p className="text-gray-500">
                        Manage customer follow-ups
                    </p>
                </div>

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

            <FollowUpForm
                isOpen={showForm}
                onClose={() => {
                    setShowForm(false);
                    setEditingFollowUp(null);
                }}
                onSave={handleSave}
                followup={editingFollowUp}
                customers={customers}
            />

        </DashboardLayout>
    );
}

export default FollowUps;