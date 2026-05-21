export const LEAGUES = [
    {
        code: "PL",
        name: "Premier League",
        shortName: "England",
        logo: "https://crests.football-data.org/PL.png"
    },
    {
        code: "PD",
        name: "La Liga",
        shortName: "Spain",
        logo: "https://crests.football-data.org/PD.png"
    },
    {
        code: "BL1",
        name: "Bundesliga",
        shortName: "Germany",
        logo: "https://crests.football-data.org/BL1.png"
    },
    {
        code: "SA",
        name: "Serie A",
        shortName: "Italy",
        logo: "https://crests.football-data.org/SA.png"
    },
    {
        code: "FL1",
        name: "Ligue 1",
        shortName: "France",
        logo: "https://crests.football-data.org/FL1.png"
    }
];

export const getLeague = (code) =>
    LEAGUES.find((league) => league.code === code) || LEAGUES[0];
