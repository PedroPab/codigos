const db = require("./../../network/database.js")
const boom = require("@hapi/boom")
const collection = 'codigosReferidos'
const referidos = 'referidos'
const premios = 'premios'

const numeroPremio = 3//el numero de referidos necesarios para tener un premio

async function findsCodigo() {//podemos buscar los codigos de rederios por nombre o todos

	try {
		const ref = await db.collection(collection)
		const snapshop = await ref.get()
		if (snapshop.empty) throw (boom.notFound('no hay ningun codigo con este codigop'))
		const rta = []
		snapshop.forEach(doc => {
			rta.push({ id: doc.id, ...doc.data() })
		})
		return (rta)
	} catch (error) {
		throw error
	}
}

async function findCodigo(codigo) {//podemos buscar los codigos de rederios por nombre o todos
	try {
		const ref = await db.collection(collection).doc(`C${codigo}`)
		const snapshop = await ref.get()
		if (!snapshop.exists) throw (boom.notFound('no hay ningun codigo con este codigop'))
		return (snapshop.data())
	} catch (error) {
		throw error
	}
}

async function findReferido(codigo) {//podemos buscar los codigos de rederios por nombre o todos
	try {
		const ref = await db.collection(collection).doc(`C${codigo}`)
		const snapshop = await ref.collection(referidos).get()

		const rta = []
		snapshop.forEach(doc => {
			rta.push({ id: doc.id, ...doc.data() })
		})
		return (rta)

	} catch (error) {
		throw error
	}
}

async function findPremio(codigo) {//podemos buscar los codigos de rederios por nombre o todos
	try {
		const ref = await db.collection(collection).doc(`C${codigo}`)
		const snapshop = await ref.collection(premios).get()

		const rta = []
		snapshop.forEach(doc => {
			rta.push({ id: doc.id, ...doc.data() })
		})
		console.log(rta)
		return (rta)

	} catch (error) {
		throw error
	}
}

async function addCodigo(fulldata) {
	try {
		const ref = db.collection(collection).doc(`C${fulldata.codigo}`)
		const codigo = await ref.set(fulldata)
		return 

	} catch (error) {
		throw error
	}

}

async function addReferido(fullData) {
	try {
		const ref = await db.collection(collection).doc(`C${fullData.codigo}`)

		const addRefe = await ref.collection(referidos).doc()
			.set({ fullData })
			return
	} catch (error) {
		throw error
	}

}

async function addPremio(fullData) {
	try {
		console.log('hoa')
		const ref = await db.collection(collection).doc(`C${fullData.codigo}`)
		const addPremi = await ref.collection(premios).doc()
			.set({ fullData })
		return 
	} catch (error) {
		throw error
	}
}


async function putCodigo(fullData, key) {
	try {
		const ref = await db.collection(collection).doc(`C${fullData.codigo}`)
		const update = await ref.update({ [key]: fullData[key] + 1 })
		return 

	} catch (error) {
		throw error
	}
}
module.exports = {
	findsCodigo,
	findCodigo,
	findReferido,
	findPremio,
	addCodigo,
	addReferido,
	addPremio,
	putCodigo,

}
