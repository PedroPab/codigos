const dotenv = require('dotenv')

const path = require('path');

const entorno = process.env.NODE_ENV || 'development'

dotenv.config({
	path: path.resolve('.' + entorno + '.env')
})

console.log(`Corriendo el server de codigos en ${process.env.NODE_ENV} en el puerto  ${process.env.PORT}
leido en del archivo ${path.resolve(__dirname + entorno + '.env')}`)


module.exports = {
	NODE_ENV: process.env.NODE_ENV || 'development',
	HOST: process.env.HOST || '127.0.0.1',
	PORT: process.env.PORT || 8087,
	APIKEY: process.env.APIKEY || "8087",
	SECRET: process.env.SECRET
}