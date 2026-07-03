import { useEffect, useState } from "react";
import Modal from "../common/Modal";

function CustomerForm({ isOpen, onClose, onSave, customer }) {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        company: "",
        status: "NEW",
    });

    useEffect(() => {
        if (isOpen && customer) {
            setFormData({
                name: customer.name || "",
                phone: customer.phone || "",
                email: customer.email || "",
                company: customer.company || "",
                status: customer.status || "NEW",
            });
        } else if (!isOpen) {
            setFormData({
                name: "",
                phone: "",
                email: "",
                company: "",
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
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
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