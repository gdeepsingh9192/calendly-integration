
const https = require('https')
const UserService = require('./userService')
const DbService = require('./db')

class CalendarService {

    constructor() {
        this.userService = new UserService()
        this.dbService = new DbService()
    }

    getSchedule(userId, callback) {
        var userInfo = this.userService.getUserInfo(userId)
        var orgId = userInfo.orgId
        var calendlyUserId = userInfo.calendlyUserId

        var options = {
            host: 'api.calendly.com',
            protocol: 'https:',
            method: 'GET',
            path: '/scheduled_events',
            queryParams: {
                'organization': orgId,
                'user': calendlyUserId
            }
        }

        // TODO - Fix error handling
        // TODO - Fix pagination
        https
            .request(options, (response) => {
                var body = ''
                response.on('data', (chunk) => {
                    body += chunk
                })
                response.on('end', () => {
                    var result = []
                    
                    JSON.parse(body).collection.forEach((obj) => {
                        result.push([
                            Date.parse(obj['start_time']),
                            Date.parse(obj['end_time'])
                        ])
                    }) 
                    return callback(null, result);
                })
            })
            .end()
    }


}

module.exports = CalendarService
