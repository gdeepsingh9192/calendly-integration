const data = require('../data/data.json')

class DbService {

    get(key) {
        if (data.hasOwnProperty(key)) {
            return data[key]
        } else {
            null
        }
    } 
}

module.exports = DbService