const store = require("./store.js")
const boom = require("@hapi/boom")
const bcrypt = require('bcrypt')
const { refreshToken } = require("firebase-admin/app")

async function addUser(data) {
	try {
		console.log('[controlle users] addUser ')
		if (!data.role) data.role = 'client'//esto se deberia  de poner un un midelware para mayor control

		const usuarioBuscado = await store.findUserFilter({ telefono: data.telefono })
		console.log(usuarioBuscado);
		if (usuarioBuscado) {
			const yaCreado = usuarioBuscado.find(element => element.role == data.role)
			if (yaCreado) throw boom.conflict('ya existe un ususario con este telefono registrado')
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
		return dataUser
	} catch (error) {
		throw error
	}
}

async function findUser(data) {//debe recibir un objeto con una sola key y del nombre de la key sera el filtro de al busqueda{ phone: 34688534 },
	try {
		console.log('[controller users] findUser ')
		const user = await store.findUserFilter(data)
		if (!user[0]) {
			throw boom.badData(`no se encontro ningun usuario con este ${Object.keys(data)}`)
		}
		delete user[0]?.password
		return user
	} catch (error) {
		throw error
	}
}

async function findUserFull(id) {
	try {
		console.log('[controller users] findUserFull ')
		const user = await store.findUserFull(id)

		return user
	} catch (error) {
		throw error
	}
}

async function userUpdate(data, userPre) {//reciebe el caompo que queremos actualisar y al todo el objeot del usruario , en especial el id
	try {
		console.log('[controller users] userUpdate ')
		const user = await store.userUpdate(data, userPre)

		return user
	} catch (error) {
		throw error
	}
}




module.exports = {
	addUser,
	findUser,
	findUserFull,
	userUpdate,

}
