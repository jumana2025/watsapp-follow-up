function CustomerTable({ customers }) {
    return (
        <div className="bg-white rounded-xl shadow">

            <table className="min-w-full">

                <thead className="bg-gray-100">

                    <tr>

                        <th className="px-4 py-3 text-left">Name</th>

                        <th className="px-4 py-3 text-left">Phone</th>

                        <th className="px-4 py-3 text-left">Email</th>

                        <th className="px-4 py-3 text-left">Company</th>

                        <th className="px-4 py-3 text-left">Status</th>

                    </tr>

                </thead>

                <tbody>

                    {customers.length === 0 ? (

                        <tr>

                            <td
                                colSpan="5"
                                className="text-center py-6"
                            >
                                No Customers Found
                            </td>

                        </tr>

                    ) : (

                        customers.map((customer) => (

                            <tr
                                key={customer.id}
                                className="border-t"
                            >

                                <td className="px-4 py-3">
                                    {customer.name}
                                </td>

                                <td className="px-4 py-3">
                                    {customer.phone}
                                </td>

                                <td className="px-4 py-3">
                                    {customer.email}
                                </td>

                                <td className="px-4 py-3">
                                    {customer.company}
                                </td>

                                <td className="px-4 py-3">
                                    {customer.status}
                                </td>

                            </tr>

                        ))

                    )}

                </tbody>

            </table>

        </div>
    );
}

export default CustomerTable;