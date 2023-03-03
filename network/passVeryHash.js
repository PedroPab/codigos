const bcrypt = require('bcrypt')

async function hashPassword() {
	const myPassword = 'admin 123 ñ'
	const hash = '$2b$10$/.oeY6YhmFLY5IWFDnvKlOZ3ynMNauS.4G7aIBgAi.G.m/mI5TNhG'

	const isMatch = await bcrypt.compare(myPassword, hash)
	
	console.log(isMatch)
}

hashPassword()