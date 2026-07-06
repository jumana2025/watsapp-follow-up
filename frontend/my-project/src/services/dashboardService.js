import api from "./api";

export const getDashboardStats = async () => {
    const response = await api.get("followups/dashboard/statistics/");
    return response.data;
};

export const getTodayFollowUps = async () => {
    const response = await api.get("followups/today/");
    return response.data;
};

export const getCompletedFollowUps = async () => {
    const response = await api.get("followups/completed/");
    return response.data;
};
