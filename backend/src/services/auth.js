const login = (username, password) => {
    // if fail, just throw error
    return {
        accessToken: '',
        refreshToken: '',
    }
}

const logout = () => {

}

module.exports = {
    login,
    logout,
}