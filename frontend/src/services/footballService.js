import apiClient from "./apiClient";

const API_URL = "/api/football";

export const getStandings = (league) => {
    return apiClient.get(`${API_URL}/standings/${league}`);
};

export const getMatches = (league) => {
    return apiClient.get(`${API_URL}/matches/${league}`);
};

export const getTeamDetails = (id) => {
    return apiClient.get(`${API_URL}/team/${id}`);
};

export const getTeamMatches = (id) => {
    return apiClient.get(`${API_URL}/team/${id}/matches`);
};

export const getTeamPreviousMatches = (teamId) => {
    return apiClient.get(
        `${API_URL}/team/${teamId}/previous-matches`
    );
};

export const getFinishedMatches =(league) => {
    return apiClient.get(
        `${API_URL}/results/${league}`
    );
};

export const getTopScorers = (league) => {
    return apiClient.get(
        `${API_URL}/scorers/${league}`
    );
};

export const getPlayerDetails = (id) => {
    return apiClient.get(
         `${API_URL}/player/${id}`
    );
};

export const searchEntities = (query) => {
    return apiClient.get(
        `${API_URL}/search`,
        {
            params: {
                query
            }
        }
    );
};
