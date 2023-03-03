const boom = require("@hapi/boom")
const config = require('./../../')
const APIKEY = process.env.APIKEY

function checkApiKey(req, res, next) {
    const apiKey = req.headers['api']
    if (apiKey === APIKEY) {
        next()
    } else {
        next(boom.unauthorized())
    }
}

module.exports = { checkApiKey }
