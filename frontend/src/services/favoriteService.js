import apiClient from "./apiClient";

export const getFavoriteTeams = () =>
    apiClient.get(
        "/favorites/teams"
    );

export const addFavoriteTeam = (
    teamData
) =>
    apiClient.post(
        "/favorites/team",
        {
            teamId: teamData.id,
            teamName: teamData.name,
            teamLogo: teamData.logo
        }
    );

export const removeFavoriteTeam = (
    teamId
) =>
    apiClient.delete(
        `/favorites/team/${teamId}`
    );

export const getFavoritePlayers = () =>
    apiClient.get(
        "/favorites/players"
    );

export const addFavoritePlayer = (
    playerData
) =>
    apiClient.post(
        "/favorites/player",
        {
            playerId: playerData.id,
            playerName: playerData.name
        }
    );

export const removeFavoritePlayer = (
    playerId
) =>
    apiClient.delete(
        `/favorites/player/${playerId}`
    );