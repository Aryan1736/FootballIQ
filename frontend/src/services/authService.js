import apiClient from "./apiClient";

const mapAuthResponse = (data) => ({
    token: data.token,
    user: {
        id: data.userId,
        username: data.username,
        email: data.email
    }
});

export const loginRequest = async ({ email, password }) => {
    const response = await apiClient.post("/auth/login", {
        email,
        password
    });

    return mapAuthResponse(response.data);
};

export const registerRequest = async ({ username, email, password }) => {
    const response = await apiClient.post("/auth/register", {
        username,
        email,
        password
    });

    return mapAuthResponse(response.data);
};
