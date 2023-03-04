const jwt = require('jsonwebtoken')

const secret = 'domiburguer'
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjbGllbnQiLCJpYXQiOjE2Nzc4MDI3OTF9.L_6zdc2EnjtiWIG5Meewsy1NGnpssoXR7Mts4EG5rRg'

function veriToken(token, secret){
	return jwt.verify(token, secret)
}

const payload = veriToken(token, secret)
console.log(payload)