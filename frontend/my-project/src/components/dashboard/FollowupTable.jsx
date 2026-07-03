function FollowupTable() {

    return (
        <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-semibold mb-5">
                Today's Follow-ups
            </h2>

            <table className="w-full">

                <thead>

                    <tr className="border-b">

                        <th className="text-left py-2">
                            Customer
                        </th>

                        <th className="text-left py-2">
                            Time
                        </th>

                    </tr>

                </thead>

                <tbody>

                    <tr>

                        <td className="py-3">
                            Rahul
                        </td>

                        <td>
                            10:00 AM
                        </td>

                    </tr>

                    <tr>

                        <td className="py-3">
                            Anjali
                        </td>

                        <td>
                            2:30 PM
                        </td>

                    </tr>

                </tbody>

            </table>

        </div>
    );
}

export default FollowupTable;