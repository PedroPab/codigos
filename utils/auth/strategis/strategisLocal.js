const boom = require('@hapi/boom')
const { Strategy } = require('passport-local')
const { findTelefono } = require('./../../../components/codigosReferidos/store')
const bcrypt = require('bcrypt')

const localStrategy = new Strategy({
	usernameField: 'telefono',
	passwordField: 'password'
}
	, async (telefono, password, done) => {
		try {
			console.log( 'user')

			const user = await findTelefono(telefono)
			console.log(user, 'user')

			if (!user) {
				done(boom.unauthorized(), false)
			}
			// console.log(user, 'user')

			const hash = user.password
			const isMatch = await bcrypt.compare(password, hash)
			if (!isMatch) {
				done(boom.unauthorized(), false)
			}
			delete user.password
			done(null, user)

		} catch (error) {

		}
	})

module.exports = localStrategy