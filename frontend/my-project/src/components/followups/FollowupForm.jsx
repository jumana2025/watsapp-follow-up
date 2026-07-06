import { useEffect, useState } from "react";
import Modal from "../common/Modal";

const statusOptions = [
    { value: "PENDING", label: "Pending" },
    { value: "COMPLETED", label: "Completed" },
];

function FollowUpForm({ isOpen, onClose, onSave, followup, customers }) {
    const [formData, setFormData] = useState({
        customer: "",
        follow_up_date: "",
        follow_up_time: "",
        notes: "",
        priority: "Medium",
        next_follow_up_date: "",
        status: "PENDING",
    });

    useEffect(() => {
        if (isOpen && followup) {
            setFormData({
                customer: followup.customer || followup.customer_id || "",
                follow_up_date: followup.follow_up_date || followup.followup_date || "",
                follow_up_time: followup.follow_up_time || "",
                notes: followup.notes || "",
                priority: followup.priority || "Medium",
                next_follow_up_date: followup.next_follow_up_date || "",
                status: (followup.status || "PENDING").toUpperCase(),
            });
        } else if (isOpen && customers.length > 0) {
            setFormData((prev) => ({
                ...prev,
                customer: prev.customer || customers[0].id,
            }));
        } else {
            setFormData({
                customer: "",
                follow_up_date: "",
                follow_up_time: "",
                notes: "",
                priority: "Medium",
                next_follow_up_date: "",
                status: "PENDING",
            });
        }
    }, [isOpen, followup, customers]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={followup ? "Edit Follow-up" : "Add Follow-up"}
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Customer</label>
                    <select
                        name="customer"
                        value={formData.customer}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    >
                        <option value="" disabled>
                            Select customer
                        </option>
                        {customers.map((customer) => (
                            <option key={customer.id} value={customer.id}>
                                {customer.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Follow-up Date</label>
                    <input
                        type="date"
                        name="follow_up_date"
                        value={formData.follow_up_date}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Follow-up Time</label>
                    <input
                        type="time"
                        name="follow_up_time"
                        value={formData.follow_up_time}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Notes</label>
                    <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        rows={4}
                        className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Enter follow-up notes"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Priority</label>
                    <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Next Follow-up Date</label>
                    <input
                        type="date"
                        name="next_follow_up_date"
                        value={formData.next_follow_up_date}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    >
                        {statusOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                        {followup ? "Update Follow-up" : "Save Follow-up"}
                    </button>
                </div>
            </form>
        </Modal>
    );
}

export default FollowUpForm;
