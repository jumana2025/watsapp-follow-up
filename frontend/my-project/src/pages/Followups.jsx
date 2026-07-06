import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import FollowUpForm from "../components/followups/FollowUpForm";
import FollowUpTable from "../components/followups/FollowUpTable";

import {
    getFollowUps,
    createFollowUp,
    updateFollowUp,
    deleteFollowUp,
    exportFollowUpsCSV,
} from "../services/followupService";
import { getCustomers } from "../services/customerService";

function FollowUps() {
    const [followups, setFollowUps] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingFollowUp, setEditingFollowUp] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, activeFilter]);

    const handleExport = async () => {
        try {
            const blob = await exportFollowUpsCSV();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "followups.csv";
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error("Export failed", error);
            alert("Failed to export follow-ups.");
        }
    };

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
                status: followup.status.toLowerCase(),
                next_follow_up_date: followup.next_follow_up_date || null,
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
            if (error.response && error.response.data) {
                alert("Error saving follow-up: " + JSON.stringify(error.response.data));
            } else {
                alert("An unexpected error occurred while saving.");
            }
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

    const handleMarkDone = async (followup) => {
        try {
            await updateFollowUp(followup.id, {
                ...followup,
                status: "completed",
            });
            fetchFollowUps();
        } catch (error) {
            console.error(error);
        }
    };

    const filteredFollowups = useMemo(() => {
        let result = followups;

        if (activeFilter === 'High' || activeFilter === 'Medium' || activeFilter === 'Low') {
            result = result.filter(item => (item.priority || "").toLowerCase() === activeFilter.toLowerCase());
        }

        const normalizedQuery = searchQuery.trim().toLowerCase();
        if (!normalizedQuery) return result;

        return result.filter((followup) => {
            const customerName = followup.customer_name || "";
            const notes = followup.notes || "";
            return (
                customerName.toLowerCase().includes(normalizedQuery) ||
                notes.toLowerCase().includes(normalizedQuery)
            );
        });
    }, [followups, searchQuery, activeFilter]);

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex flex-col sm:flex-row gap-4 flex-1">
                        <div className="relative w-full max-w-sm">
                            <svg className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search follow-ups..."
                                className="w-full rounded-full border border-slate-200 bg-white py-2.5 pl-11 pr-4 text-sm text-slate-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <select
                            value={activeFilter}
                            onChange={(e) => setActiveFilter(e.target.value)}
                            className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none pr-10 relative"
                            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748B'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1rem' }}
                        >
                            <option value="All">All Priority</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleExport}
                            className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-emerald-700"
                        >
                            <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Export CSV
                        </button>
                        <button
                            onClick={() => {
                                setEditingFollowUp(null);
                                setShowForm(true);
                            }}
                            className="inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-blue-700"
                        >
                            + New Follow-up
                        </button>
                    </div>
                </div>

                <FollowUpTable
                    followups={filteredFollowups.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onMarkDone={handleMarkDone}
                />
                
                {filteredFollowups.length > 0 && (
                    <div className="px-6 py-4 bg-white border border-slate-100 rounded-b-2xl shadow-sm -mt-6 flex items-center justify-between">
                        <span className="text-sm text-slate-500">
                            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredFollowups.length)} of {filteredFollowups.length} entries
                        </span>
                        <div className="flex gap-2">
                            <button 
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Previous
                            </button>
                            <button 
                                onClick={() => setCurrentPage(p => Math.min(Math.ceil(filteredFollowups.length / itemsPerPage), p + 1))}
                                disabled={currentPage === Math.ceil(filteredFollowups.length / itemsPerPage)}
                                className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>

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
