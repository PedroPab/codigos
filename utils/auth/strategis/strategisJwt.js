const { Strategy, ExtractJwt } = require('passport-jwt')
const { SECRET } = require('../../../network/config')

const options = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: SECRET
}

const jwtStrategy = new Strategy(options, (payload, done) => {
	console.log(`[strategisJwt] jwtStrategy`);
	console.log(options, payload, done)
	return done(null, payload)
})

module.exports = jwtStrategy