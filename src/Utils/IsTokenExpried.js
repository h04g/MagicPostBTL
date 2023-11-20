const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
};

export const isTokenExpired = (token) => {
    if (!token) {
        return true;
    }
    const tokenExpired = parseJwt(token)?.exp;
    return tokenExpired < Date.now() / 1000;
}
