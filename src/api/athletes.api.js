import http from "./http";

export const getAthletes = () => http.get("/athletes");
export const createAthlete = (data) => http.post("/athletes", data);
