const bcrypt = require('bcrypt')

async function hashPassword() {
	const myPassword = 'admin 123 ñ'
	const hash = await bcrypt.hash(myPassword, 10)
	
	console.log(hash)
}

hashPassword()