const TOKEN_KEY = "footballiq_token";
const USER_KEY = "footballiq_user";

export const getStoredToken = () => sessionStorage.getItem(TOKEN_KEY);

export const getStoredUser = () => {
    const value = sessionStorage.getItem(USER_KEY);

    if (!value) {
        return null;
    }

    try {
        return JSON.parse(value);
    } catch {
        sessionStorage.removeItem(USER_KEY);
        return null;
    }
};

export const storeAuthSession = ({ token, user }) => {
    sessionStorage.setItem(TOKEN_KEY, token);
    sessionStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const clearAuthSession = () => {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
};
