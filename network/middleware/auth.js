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

function checkAdminRole(req, res, next) {
	const user = req.user
	if (user.role == "admin") {
		next()
	}
	next(boom.unauthorized())

}

function checkAdminRoles(roles) {
	return (req, res, next) => {
		const user = req.user
		if (roles.includes(user.role)) {
			next()
		} else {
			next(boom.unauthorized(`no autorisado para ${user.role}`))
		}
	}
}

module.exports = {
	checkApiKey,
	checkAdminRole,
	checkAdminRoles,
}
