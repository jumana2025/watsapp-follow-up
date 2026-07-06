import { useEffect, useState } from "react";
import Modal from "../common/Modal";

function CustomerForm({ isOpen, onClose, onSave, customer, error }) {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        company: "",
        product_service: "",
        lead_source: "",
        status: "NEW",
    });

    useEffect(() => {
        if (isOpen && customer) {
            setFormData({
                name: customer.name || "",
                phone: customer.phone || "",
                email: customer.email || "",
                company: customer.company || "",
                product_service: customer.product_service || "",
                lead_source: customer.lead_source || "",
                status: customer.status || "NEW",
            });
        } else if (!isOpen) {
            setFormData({
                name: "",
                phone: "",
                email: "",
                company: "",
                product_service: "",
                lead_source: "",
                status: "NEW",
            });
        }
    }, [isOpen, customer]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={customer ? "Edit Customer" : "Add Customer"}>
            <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                        {error}
                    </div>
                )}
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                />

                <input
                    type="text"
                    name="phone"
                    placeholder="Phone (10 digits)"
                    value={formData.phone}
                    onChange={handleChange}
                    maxLength="10"
                    className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                />

                <input
                    type="text"
                    name="company"
                    placeholder="Company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                />

                <input
                    type="text"
                    name="product_service"
                    placeholder="Product/Service"
                    value={formData.product_service}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />

                <input
                    type="text"
                    name="lead_source"
                    placeholder="Lead Source"
                    value={formData.lead_source}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />

                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                    <option value="NEW">New</option>
                    <option value="CONTACTED">Contacted</option>
                    <option value="INTERESTED">Interested</option>
                    <option value="FOLLOWUP">Follow-up</option>
                    <option value="NOT_INTERESTED">Not Interested</option>
                    <option value="CLOSED">Closed</option>
                </select>

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
                        Save Customer
                    </button>
                </div>
            </form>
        </Modal>
    );
}

export default CustomerForm;