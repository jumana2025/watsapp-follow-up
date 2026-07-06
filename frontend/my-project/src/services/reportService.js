import api from "./api";

export const getReportsData = async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const response = await api.get(`customers/${query ? `?${query}` : ""}`);
    return response.data;
};

export const exportReportsToExcel = async (data) => {
    const rows = data.map((customer) => ({
        Name: customer.name,
        Phone: customer.phone,
        Email: customer.email,
        Company: customer.company,
        Status: customer.status,
        "Created At": new Date(customer.created_at).toLocaleDateString(),
    }));

    // Create CSV format
    const headers = Object.keys(rows[0] || {});
    const csv = [
        headers.join(","),
        ...rows.map((row) => headers.map((h) => `"${row[h] || ""}"`).join(",")),
    ].join("\n");

    // Create and download file
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `customers_${new Date().getTime()}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
