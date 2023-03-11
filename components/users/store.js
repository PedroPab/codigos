const db = require("../../network/database.js")
const boom = require("@hapi/boom")
const collection = 'users'

async function addUser(fulldata) {
	try {
		console.log(`[store Users] addUser, '${fulldata}'`)
		const ref = db.collection(collection).doc()
		const codigo = await ref.set({ ...fulldata, id: ref.id })
		return { codigo, data: { ...fulldata, id: ref.id } }
	} catch (error) {
		throw error
	}
}

async function findUserFilter(user) {//debe recibir un objeto con una sola key y del nombre de la key sera el filtro de al busqueda{ phone: 34688534 },
	try {
		console.log(`[store Users] findUser, '${user}'`, Object.keys(user)[0], '==', Object.values(user)[0])

		const ref = await db.collection(collection)
		const snapshop = await ref.where(Object.keys(user)[0], '==', Object.values(user)[0]).get()
		// if (!snapshop) throw (boom.notFound('no hay ningun codigo con este telefono'))
		if (!snapshop) return undefined
		const rta = []
		snapshop.forEach(doc => {
			rta.push(doc.data())
		})
		return rta[0]
	} catch (error) {
		throw error
	}
}


module.exports = {
	addUser,
	findUserFilter,
}
