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
import * as XLSX from "xlsx";

function Customers() {
    const [customers, setCustomers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [feedback, setFeedback] = useState({ type: "", message: "" });
    const [search, setSearch] = useState(localStorage.getItem("customerSearch") || "");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [formError, setFormError] = useState("");

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
            setFeedback({ type: "error", message: "Could not load customers." });
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
            NOT_INTERESTED: "NOT_INTERESTED",
            CLOSED: "CLOSED",
            New: "NEW",
            Contacted: "CONTACTED",
            Interested: "INTERESTED",
            "Follow-up": "FOLLOWUP",
            "Not Interested": "NOT_INTERESTED",
            Closed: "CLOSED",
        };
        return statusMap[status] || "NEW";
    };

    const getStatusStyle = (status) => {
        if (status === "INTERESTED") return "text-emerald-500 bg-emerald-50 border-emerald-200";
        if (status === "NEW") return "text-blue-500 bg-blue-50 border-blue-200";
        if (status === "CLOSED") return "text-slate-500 bg-slate-50 border-slate-200";
        if (status === "NOT_INTERESTED") return "text-rose-500 bg-rose-50 border-rose-200";
        if (status === "CONTACTED") return "text-indigo-500 bg-indigo-50 border-indigo-200";
        if (status === "FOLLOWUP") return "text-amber-500 bg-amber-50 border-amber-200";
        return "text-blue-500 bg-blue-50 border-blue-200";
    };

    const getStatusLabel = (status) => {
        const map = {
            NEW: "New",
            CONTACTED: "Contacted",
            FOLLOWUP: "Follow-up",
            INTERESTED: "Interested",
            NOT_INTERESTED: "Not Interested",
            CLOSED: "Closed"
        };
        return map[status] || status;
    };

    const formatDate = (value) => {
        if (!value) return "-";
        return new Date(value).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    const getInitials = (name) => {
        return name ? name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) : "?";
    };

    const getRandomColor = (name) => {
        const colors = ["bg-blue-600", "bg-purple-600", "bg-rose-500", "bg-amber-500", "bg-emerald-600", "bg-indigo-600"];
        const index = name ? name.charCodeAt(0) % colors.length : 0;
        return colors[index];
    };

    const filteredCustomers = customers.filter((customer) => {
        const query = search.toLowerCase();
        const matchesSearch =
            customer.name.toLowerCase().includes(query) ||
            customer.phone.toLowerCase().includes(query) ||
            customer.company.toLowerCase().includes(query);
        const matchesStatus = statusFilter === "ALL" || customer.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleSave = async (customer) => {
        setFormError("");
        try {
            const payload = {
                ...customer,
                status: normalizeStatus(customer.status),
            };
            if (editingCustomer) {
                await updateCustomer(editingCustomer.id, payload);
                setFeedback({ type: "success", message: "Customer updated successfully." });
            } else {
                await createCustomer(payload);
                setFeedback({ type: "success", message: "Customer added successfully." });
            }
            setShowForm(false);
            setEditingCustomer(null);
            fetchCustomers(search);
        } catch (error) {
            if (error.response?.data) {
                const msg = Object.values(error.response.data).flat().join(" ");
                setFormError(msg);
            } else {
                setFormError("Failed to save customer. Please try again.");
            }
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this customer?");
        if (!confirmDelete) return;
        try {
            await deleteCustomer(id);
            setFeedback({ type: "success", message: "Customer deleted successfully." });
            fetchCustomers(search);
        } catch (error) {
            console.error(error);
            setFeedback({ type: "error", message: "Failed to delete customer." });
        }
    };

    const handleWhatsAppClick = (phone) => {
        const cleanedPhone = `${phone}`.replace(/\D/g, "");
        window.open(`https://wa.me/${cleanedPhone}`, "_blank", "noopener,noreferrer");
    };

    const handleExportCustomers = () => {
        const rows = customers.map((c) => ({
            Name: c.name,
            Company: c.company,
            Phone: c.phone,
            Email: c.email,
            "Product/Service": c.product_service || "-",
            "Lead Source": c.lead_source || "-",
            Status: c.status,
            "Created At": new Date(c.created_at).toLocaleDateString()
        }));

        const worksheet = XLSX.utils.json_to_sheet(rows);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Customers");
        XLSX.writeFile(workbook, `Customers_${new Date().getTime()}.xlsx`);

        setFeedback({ type: "success", message: "Customer list exported to Excel successfully." });
    };

    return (
        <DashboardLayout>
            <div className="space-y-6">
                
                {/* Top Bar matching image */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                        {/* Search Input */}
                        <div className="relative max-w-sm w-full">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Search customers..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        
                        {/* Status Dropdown */}
                        <div className="relative">
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="appearance-none bg-white border border-slate-200 text-slate-700 py-2.5 pl-4 pr-10 rounded-xl text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer"
                            >
                                <option value="ALL">All Status</option>
                                <option value="NEW">New</option>
                                <option value="CONTACTED">Contacted</option>
                                <option value="FOLLOWUP">Follow-up</option>
                                <option value="INTERESTED">Interested</option>
                                <option value="NOT_INTERESTED">Not Interested</option>
                                <option value="CLOSED">Closed</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={handleExportCustomers}
                            className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-50"
                        >
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                            Export
                        </button>
                        <button
                            onClick={() => setShowForm(true)}
                            className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 shadow-sm"
                        >
                            + Add Customer
                        </button>
                    </div>
                </div>

                {feedback.message && (
                    <div className={`rounded-xl border px-4 py-3 text-sm ${feedback.type === "error" ? "border-red-200 bg-red-50 text-red-700" : "border-emerald-200 bg-emerald-50 text-emerald-700"}`}>
                        {feedback.message}
                    </div>
                )}

                {/* Main Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse">
                            <thead>
                                <tr className="border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider text-left">
                                    <th className="px-6 py-4">Customer</th>
                                    <th className="px-6 py-4">Company</th>
                                    <th className="px-6 py-4">Product</th>
                                    <th className="px-6 py-4">Source</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Added</th>
                                    <th className="px-6 py-4 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-sm">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-10 text-center text-slate-500">Loading customers...</td>
                                    </tr>
                                ) : filteredCustomers.length > 0 ? (
                                    filteredCustomers.map((customer) => (
                                        <tr key={customer.id} className="hover:bg-slate-50">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={`flex h-10 w-10 items-center justify-center rounded-full text-white font-semibold ${getRandomColor(customer.name)}`}>
                                                        {getInitials(customer.name)}
                                                    </div>
                                                    <div>
                                                        <Link to={`/customers/${customer.id}`} className="font-semibold text-slate-800 hover:text-blue-600 block">
                                                            {customer.name}
                                                        </Link>
                                                        <span className="text-xs text-slate-400">{customer.phone}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 font-medium text-slate-600">{customer.company || "-"}</td>
                                            <td className="px-6 py-4 text-slate-500">{customer.product_service || "-"}</td>
                                            <td className="px-6 py-4 text-slate-500">{customer.lead_source || "-"}</td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusStyle(customer.status)}`}>
                                                    {getStatusLabel(customer.status)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-slate-500 whitespace-nowrap">{formatDate(customer.created_at)}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-center gap-3">
                                                    <button
                                                        onClick={() => handleWhatsAppClick(customer.phone)}
                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-600 text-xs font-semibold hover:bg-emerald-100 transition-colors"
                                                    >
                                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                                                        Chat
                                                    </button>
                                                    
                                                    <button
                                                        onClick={() => {
                                                            setEditingCustomer(customer);
                                                            setShowForm(true);
                                                        }}
                                                        className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
                                                        aria-label="Edit"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                                    </button>
                                                    
                                                    <button
                                                        onClick={() => handleDelete(customer.id)}
                                                        className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                                                        aria-label="Delete"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-10 text-center text-slate-500">No customers found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <CustomerForm
                    isOpen={showForm}
                    customer={editingCustomer}
                    error={formError}
                    onClose={() => {
                        setShowForm(false);
                        setEditingCustomer(null);
                        setFormError("");
                    }}
                    onSave={handleSave}
                />
            </div>
        </DashboardLayout>
    );
}

export default Customers;
