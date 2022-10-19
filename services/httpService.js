
const debug = require('debug')('httpService')
const http = require('http')
const https = require('https')

var makeRequest = function(options) {
    return new Promise((resolve, reject) => {
        debug(`Initiating request with options ${options}`)
        let dispatcher = (options.protocol == 'https') ? https : http
        let req = dispatcher.request(options, (res) => {
            res.on('error', (err) => {
                debug(`Received error response ${err}`)
                reject(err)
            })

            let body = ''
            res.on('data', (chunk) => {
                body += chunk
            })
            res.on('end', () => {
                debug(`Received complete response`)
                resolve(body)
            })
        })
        req.on('error', (err) => {
            debug(`Request failed with error ${err}`)
            reject(err)
        })

        if (options.body) {
            debug(`Writing request body`)
            req.write(body)
        }
        req.end()
        debug(`Request sent.`)
    })
}

exports.makeRequest = makeRequest
