import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import CustomerForm from "../components/customers/CustomerForm";
import {
    createCustomer,
    getCustomers,
    updateCustomer,
    deleteCustomer,
} from "../services/customerService";

function Customers() {
    const [customers, setCustomers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [feedback, setFeedback] = useState({ type: "", message: "" });
    const [search, setSearch] = useState(
        localStorage.getItem("customerSearch") || ""
    );
    const [editingCustomer, setEditingCustomer] = useState(null);

    useEffect(() => {
        localStorage.setItem("customerSearch", search);
        fetchCustomers(search);
    }, [search]);

    const fetchCustomers = async (searchText = "") => {
        setIsLoading(true);

        try {
            const data = await getCustomers(searchText);
            setCustomers(data);
            setFeedback({ type: "", message: "" });
        } catch (error) {
            console.error(error);
            setFeedback({
                type: "error",
                message: "Could not load customers.",
            });
        } finally {
            setIsLoading(false);
        }
    };


    const normalizeStatus = (status) => {
        const statusMap = {
            NEW: "NEW",
            CONTACTED: "CONTACTED",
            FOLLOWUP: "FOLLOWUP",
            INTERESTED: "INTERESTED",
            "NOT_INTERESTED": "NOT_INTERESTED",
            New: "NEW",
            Contacted: "CONTACTED",
            Interested: "INTERESTED",
            "Follow-up": "FOLLOWUP",
            "Not Interested": "NOT_INTERESTED",
        };

        return statusMap[status] || "NEW";
    };

    const handleSave = async (customer) => {
        try {
            const payload = {
                ...customer,
                status: normalizeStatus(customer.status),
            };

            if (editingCustomer) {
                await updateCustomer(editingCustomer.id, payload);

                setFeedback({
                    type: "success",
                    message: "Customer updated successfully.",
                });
            } else {
                await createCustomer(payload);

                setFeedback({
                    type: "success",
                    message: "Customer added successfully.",
                });
            }

            setShowForm(false);
            setEditingCustomer(null);

            fetchCustomers(search);

        } catch (error) {
            console.error(error);

            setFeedback({
                type: "error",
                message: "Something went wrong.",
            });
        }
    };
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this customer?"
        );

        if (!confirmDelete) return;

        try {
            await deleteCustomer(id);

            setFeedback({
                type: "success",
                message: "Customer deleted successfully.",
            });

            fetchCustomers(search);
        } catch (error) {
            console.error(error);

            setFeedback({
                type: "error",
                message: "Failed to delete customer.",
            });
        }
    };

    const handleWhatsAppClick = (phone) => {
        const cleanedPhone = `${phone}`.replace(/\D/g, "");
        const url = `https://wa.me/${cleanedPhone}`;
        window.open(url, "_blank", "noopener,noreferrer");
    };

    return (
        <DashboardLayout>
            <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Customers</h1>
                    <p className="text-gray-500 mt-1">Manage your customer records here.</p>
                </div>

                <div className="flex gap-4 items-center">
                    <input
                        type="text"
                        placeholder="Search by name, phone or company..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2 w-80 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />

                    <button
                        onClick={() => setShowForm(true)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                    >
                        + Add Customer
                    </button>
                </div>
            </div>

            {feedback.message && (
                <div className={`mb-4 rounded-lg border px-4 py-3 text-sm ${feedback.type === "error" ? "border-red-200 bg-red-50 text-red-700" : "border-green-200 bg-green-50 text-green-700"}`}>
                    {feedback.message}
                </div>
            )}

            <div className="bg-white rounded-lg shadow overflow-x-auto">
                {isLoading ? (
                    <div className="p-6 text-center text-gray-500">Loading customers...</div>
                ) : (
                    <table className="w-full">
                        <thead className="bg-green-600 text-white">
                            <tr>
                                <th className="p-3 text-left">Name</th>
                                <th className="p-3 text-left">Phone</th>
                                <th className="p-3 text-left">Company</th>
                                <th className="p-3 text-left">Status</th>
                                <th className="p-3 text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {customers.length > 0 ? (
                                customers.map((customer) => (
                                    <tr key={customer.id} className="border-b hover:bg-gray-50">
                                        <td className="p-3">
                                            <Link
                                                to={`/customers/${customer.id}`}
                                                className="text-blue-600 hover:text-blue-700"
                                            >
                                                {customer.name}
                                            </Link>
                                        </td>
                                        <td className="p-3">{customer.phone}</td>
                                        <td className="p-3">{customer.company}</td>
                                        <td className="p-3">{customer.status}</td>


                                        <td className="p-3">
                                            <div className="flex gap-2 justify-center">

                                                <button
                                                    onClick={() => {
                                                        setEditingCustomer(customer);
                                                        setShowForm(true);
                                                    }}
                                                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    onClick={() => handleDelete(customer.id)}
                                                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                                                >
                                                    Delete
                                                </button>

                                                <button
                                                    onClick={() => handleWhatsAppClick(customer.phone)}
                                                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                                                >
                                                    WhatsApp
                                                </button>

                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="p-6 text-center text-gray-500">
                                        No customers found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>

            <CustomerForm
                isOpen={showForm}
                customer={editingCustomer}
                onClose={() => {
                    setShowForm(false);
                    setEditingCustomer(null);
                }}
                onSave={handleSave}
            />
        </DashboardLayout>
    );
}

export default Customers;