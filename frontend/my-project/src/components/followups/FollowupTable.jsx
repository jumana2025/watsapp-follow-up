function FollowUpTable({
    followups,
    onEdit,
    onDelete,
}) {
    const hasActions = Boolean(onEdit || onDelete);

    const getStatusColor = (status) => {
        const normalized = (status || "").toUpperCase();

        switch (normalized) {
            case "PENDING":
                return "bg-yellow-100 text-yellow-700";

            case "COMPLETED":
                return "bg-green-100 text-green-700";

            case "MISSED":
                return "bg-red-100 text-red-700";

            default:
                return "bg-gray-100";
        }
    };

    return (
        <div className="bg-white rounded-lg shadow overflow-x-auto">

            <table className="w-full">

                <thead className="bg-green-600 text-white">

                    <tr>

                        <th className="p-3 text-left">
                            Customer
                        </th>

                        <th className="p-3 text-left">
                            Date
                        </th>

                        <th className="p-3 text-left">
                            Notes
                        </th>

                        <th className="p-3 text-center">
                            Status
                        </th>

                        <th className="p-3 text-center">
                            Actions
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {followups.length > 0 ? (

                        followups.map((followup) => (

                            <tr
                                key={followup.id}
                                className="border-b hover:bg-gray-50"
                            >

                                <td className="p-3">
                                    {followup.customer_name}
                                </td>

                                <td className="p-3">
                                    {followup.followup_date}
                                </td>

                                <td className="p-3">
                                    {followup.notes}
                                </td>

                                <td className="p-3 text-center">
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                                            followup.status
                                        )}`}
                                    >
                                        {(followup.status || "").toUpperCase()}
                                    </span>
                                </td>

                                {hasActions && (
                                    <td className="p-3">
                                        <div className="flex justify-center gap-2">
                                            {onEdit && (
                                                <button
                                                    onClick={() => onEdit(followup)}
                                                    className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                                                    aria-label="Edit follow-up"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        fill="currentColor"
                                                        className="h-4 w-4"
                                                    >
                                                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z" />
                                                        <path d="M20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.997.997 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                                                    </svg>
                                                </button>
                                            )}

                                            {onDelete && (
                                                <button
                                                    onClick={() => onDelete(followup.id)}
                                                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                                                >
                                                    Delete
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                )}

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td
                                colSpan={hasActions ? 5 : 4}
                                className="p-6 text-center text-gray-500"
                            >
                                No Follow Ups Found
                            </td>

                        </tr>

                    )}

                </tbody>

            </table>

        </div>
    );
}

export default FollowUpTable;