import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../context/useAuth";
import {
    addFavoritePlayer,
    addFavoriteTeam,
    getFavoritePlayers,
    getFavoriteTeams,
    removeFavoritePlayer,
    removeFavoriteTeam
} from "../services/favoriteService";

function useFavorites() {
    const { isAuthenticated } = useAuth();
    const [teamFavorites, setTeamFavorites] = useState([]);
    const [playerFavorites, setPlayerFavorites] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let cancelled = false;

        if (!isAuthenticated) {
            Promise.resolve().then(() => {
                if (!cancelled) {
                    setTeamFavorites([]);
                    setPlayerFavorites([]);
                }
            });
            return;
        }

        Promise.resolve()
            .then(() => {
                setLoading(true);
                return Promise.all([
                    getFavoriteTeams(),
                    getFavoritePlayers()
                ]);
            })
            .then(([teamsResponse, playersResponse]) => {
                if (!cancelled) {
                    setTeamFavorites(teamsResponse.data);
                    setPlayerFavorites(playersResponse.data);
                }
            })
            .catch(() => {
                if (!cancelled) {
                    setTeamFavorites([]);
                    setPlayerFavorites([]);
                }
            })
            .finally(() => {
                if (!cancelled) {
                    setLoading(false);
                }
            });

        return () => {
            cancelled = true;
        };
    }, [isAuthenticated]);

    const teamIds = useMemo(
        () => new Set(teamFavorites.map((favorite) => favorite.teamId)),
        [teamFavorites]
    );

    const playerIds = useMemo(
        () => new Set(playerFavorites.map((favorite) => favorite.playerId)),
        [playerFavorites]
    );

    const toggleTeamFavorite = async (
        teamData
    ) => {

        if(
            teamIds.has(
                teamData.id
            )
        ) {

            await removeFavoriteTeam(
                teamData.id
            );

            setTeamFavorites(
                (current) =>

                    current.filter(
                        (favorite) =>

                            favorite.teamId
                            !==
                            teamData.id
                    )
            );

            return false;
        }

        const response =
            await addFavoriteTeam(
                teamData
            );

        setTeamFavorites(
            (current) => [

                response.data,

                ...current
            ]
        );

        return true;
    };

    const togglePlayerFavorite = async (
        playerData
    ) => {

        if(
            playerIds.has(
                playerData.id
            )
        ) {

            await removeFavoritePlayer(
                playerData.id
            );

            setPlayerFavorites(
                (current) =>

                    current.filter(
                        (favorite) =>

                            favorite.playerId
                            !==
                            playerData.id
                    )
            );

            return false;
        }

        const response =
            await addFavoritePlayer(
                playerData
            );

        setPlayerFavorites(
            (current) => [

                response.data,

                ...current
            ]
        );

        return true;
    };

    return {
        loading,
        teamFavorites,
        playerFavorites,
        teamIds,
        playerIds,
        toggleTeamFavorite,
        togglePlayerFavorite
    };
}

export default useFavorites;
