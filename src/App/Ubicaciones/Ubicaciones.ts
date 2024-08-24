import AUTH_API from "../AuthBackendApi"

export const getUbicaciones = async () => await AUTH_API.get(`/ubicaciones`);