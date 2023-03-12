const boom = require('@hapi/boom')
const { Strategy } = require('passport-local')
const { findTelefono, findUserFilter } = require('./../../../components/users/store')
const bcrypt = require('bcrypt')

const localStrategy = new Strategy({
	usernameField: 'telefono',
	passwordField: 'password',
	passReqToCallback: true,///passReqToCallback: si se establece en true, el primer argumento que recibe la función de verificación es la solicitud (req) y no solo el username, password y done. Esto es útil si necesitas acceder a datos de la solicitud dentro de la función de verificación.

}
	, async (req, telefono, password, done) => {
		try {
			console.log(`[strategisLocal] localStrategy`);
			let role = req.body.role
			if (!role) role = 'client'//esto se deberia  de poner un un midelware para mayor control

			const user = await findUserFilter({ telefono: telefono })
			if (!user) {
				done(boom.unauthorized(), false)
			}

			const yaCreado = user.find(element => element.role == role)
			if (!yaCreado == undefined) done(boom.unauthorized(), false)

			const userRole = user.find(element => element.role == role)

			const hash = userRole.password
			const isMatch = await bcrypt.compare(password, hash)
			if (!isMatch) {
				done(boom.unauthorized(), false)
			}
			delete userRole.password

			done(null, userRole)

		} catch (error) {
			done(boom.unauthorized(), false)
		}
	})

module.exports = localStrategy