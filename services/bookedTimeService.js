const debug = require('debug')('bookedTimeService')
const makeRequest = require('./httpService').makeRequest
const UserConfigModel = require('../models/users').UserConfigModel

class BookedTimeService {

    async getTimeSlots(userId, startDate, endDate) {
        var userInfo = UserConfigModel.findAll({
            where: {
                userId: userId
            }
        })

        var orgId = userInfo.orgId
        var calendlyUserId = userInfo.calendlyUserId

        // TODO - Move API token to config.
        var options = {
            host: 'api.calendly.com',
            protocol: 'https:',
            method: 'GET',
            path: '/scheduled_events',
            headers: {
                'Authorization': 'Bearer eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNjY1Mjg4ODc5LCJqdGkiOiI4MTBkN2MyNi1mNGNiLTQ5MGUtYTk3MS1iMDk2NzlmNjliODIiLCJ1c2VyX3V1aWQiOiJhYjZlNTJiZC1iOWU5LTQyZjQtOTU0MS0yNzg5MDRhMWM0NWIifQ.Dh3CaZ7KD6RzVFmUFogW6-KR_-spGzzTUVFJYNZBa8pMEJjArMDMb3EUPDfWBQsT6gZMosClioP-igtXNvehyA'
            },
            queryParams: {
                'organization': orgId,
                'user': calendlyUserId,
                'min_start_time': new Date(startDate).toISOString(),
                'max_start_time': new Date(endDate).toISOString(),
                'page_token': null
            }
        }

        try {
            let allSlots = []
            while (true) {
                debug(`Requesting events from calendly with options ${options}`)
                let rawBody = await makeRequest(options)
                debug(`Received response from calendly ${rawBody}`)
                
                let body = JSON.parse(rawBody)
                body.collection.forEach((obj) => {
                    allSlots.push([
                        Date.parse(obj['start_time']),
                        Date.parse(obj['end_time'])
                    ])
                })

                if (body.pagination && body.pagination['next_page_token']) {
                    options.queryParams['page_token'] = body.pagination['next_page_token']
                } else {
                    break
                }
            }
            return allSlots
            
        } catch (e) {
            debug(`Error while parsing response ${e}`)
            throw e
        }
    }
}

module.exports = BookedTimeService