
const DbService = require('./db')

class UserService {

    /**
     * Get contextual info of user from DB
     * @param {string} userId 
     * @returns 
     */
    getUserInfo(userId) {
        var users = new DbService().get('users') || {}
        return users[userId] || null
    }
}

module.exports = UserService
