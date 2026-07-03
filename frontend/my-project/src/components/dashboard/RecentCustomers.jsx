function RecentCustomer() {

    return (
        <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-semibold mb-5">
                Recent Customers
            </h2>

            <table className="w-full">

                <thead>

                    <tr className="border-b">

                        <th className="text-left py-2">
                            Name
                        </th>

                        <th className="text-left py-2">
                            Company
                        </th>

                    </tr>

                </thead>

                <tbody>

                    <tr>

                        <td className="py-3">
                            Rahul
                        </td>

                        <td>
                            Google
                        </td>

                    </tr>

                    <tr>

                        <td className="py-3">
                            Anjali
                        </td>

                        <td>
                            Amazon
                        </td>

                    </tr>

                </tbody>

            </table>

        </div>
    );
}

export default RecentCustomer;