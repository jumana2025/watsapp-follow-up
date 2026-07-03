function Statcard() {

    const stats = [
        {
            title: "Total Customers",
            value: 120,
            color: "bg-blue-500",
        },
        {
            title: "Today's Follow-ups",
            value: 18,
            color: "bg-green-500",
        },
        {
            title: "Pending",
            value: 35,
            color: "bg-yellow-500",
        },
        {
            title: "Completed",
            value: 82,
            color: "bg-purple-500",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

            {stats.map((item, index) => (

                <div
                    key={index}
                    className={`${item.color} text-white rounded-xl shadow-lg p-6`}
                >
                    <h3 className="text-lg">
                        {item.title}
                    </h3>

                    <p className="text-4xl font-bold mt-4">
                        {item.value}
                    </p>

                </div>

            ))}

        </div>
    );
}

export default Statcard;