import axios from "axios";

const API_URL = "http://localhost:8080/api/football";

export const getStandings = (league) => {
    return axios.get(`${API_URL}/standings/${league}`);
};

export const getMatches = (league) => {
    return axios.get(`${API_URL}/matches/${league}`);
};

export const getTeamDetails = (id) => {
    return axios.get(`${API_URL}/team/${id}`);
};

export const getTeamMatches = (id) => {
    return axios.get(`${API_URL}/team/${id}/matches`);
};

export const getTeamPreviousMatches = (teamId) => {
    return axios.get(
        `${API_URL}/team/${teamId}/previous-matches`
    );
};