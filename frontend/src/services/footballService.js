import axios from "axios";

const API_URL = "http://localhost:8080/api/football";

export const getStandings = () => {
    return axios.get(`${API_URL}/standings`);
};

export const getMatches = () => {
    return axios.get(`${API_URL}/matches`);
};