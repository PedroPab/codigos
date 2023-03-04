const jwt = require('jsonwebtoken')

const secret = 'domiburguer'
const payload = {
	sub: 1,
	role: 'client',
}

function signToken(payload, secret){
	return jwt.sign(payload, secret)
}

const token = signToken(payload, secret)
console.log(token)