const store = require("./store.js")
const boom = require("@hapi/boom")
const bcrypt = require('bcrypt')
const { refreshToken } = require("firebase-admin/app")

async function addUser(data) {
	try {
		console.log('[controlle users] addUser ')
		const usuarioBuscado = await store.findUserFilter({ telefono: data.telefono })
		if (usuarioBuscado) {
			if (usuarioBuscado.role == data.role) throw boom.conflict('ya existe un ususario con este telefono registrado')
		}

		const fullData = {
			...data,
			role: data.role || 'client',
			date: new Date(),
		}
		if (fullData.token) delete fullData.token

		const hash = await bcrypt.hash(data.password, 10)
		const newUser = await store.addUser({ ...fullData, password: hash })
		const dataUser = newUser.data

		delete dataUser.password
		return fullData
	} catch (error) {
		throw error
	}
}

async function findUser(data) {//debe recibir un objeto con una sola key y del nombre de la key sera el filtro de al busqueda{ phone: 34688534 },
	try {
		console.log('[controller users] findUser ')
		const user = await store.findUserFilter(data)
		delete user.password
		return user
	} catch (error) {
		throw error
	}
}


module.exports = {
	addUser,
	findUser,
}
