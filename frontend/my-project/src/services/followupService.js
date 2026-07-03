import api from "./api";

export const getFollowUps = async () => {
    const response = await api.get("followups/");
    return response.data;
};

export const createFollowUp = async (data) => {
    const response = await api.post("followups/", data);
    return response.data;
};

export const updateFollowUp = async (id, data) => {
    const response = await api.put(`followups/${id}/`, data);
    return response.data;
};

export const deleteFollowUp = async (id) => {
    await api.delete(`followups/${id}/`);
};

export const getFollowUpsByCustomer = async (customerId) => {
    const response = await api.get(`followups/?customer=${customerId}`);
    return response.data;
};