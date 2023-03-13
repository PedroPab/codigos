const db = require("./../../network/database.js")
const boom = require("@hapi/boom")
const collection = 'codigosReferidos'
const referidos = 'referidos'
const premios = 'premios'

const numeroPremio = 3//el numero de referidos necesarios para tener un premio

async function findsCodigo() {//podemos buscar los codigos de rederios por nombre o todos
	try {
		console.log(`[store codigoReferidos] findsCodigo, `)

		const ref = await db.collection(collection)
		const snapshop = await ref.get()
		// if (!snapshop.empty) throw (boom.notFound('no hay ningun codigo con este codigop'))
		if (!snapshop.empty) return undefined
		const rta = []
		snapshop.forEach(doc => {
			const data = { ...doc.data() }
			delete data.password //borramao la contraseña del finds
			rta.push({ id: doc.id, ...data })
		})
		return (rta)
	} catch (error) {
		throw error
	}
}

async function findCodigo(codigo) {//podemos buscar los codigos de rederios por nombre o todos
	try {
		console.log(`[store codigoReferidos] findCodigo, codigo a buscar '${codigo}'`)
		const ref = await db.collection(collection).doc(`C${codigo}`)
		const snapshop = await ref.get()
		// if (!snapshop.exists) throw (boom.notFound('no hay ningun codigo con este codigop'))
		if (!snapshop.exists) return undefined
		console.log(snapshop.data())
		return (snapshop.data())
	} catch (error) {
		throw error
	}
}

async function findReferido(codigo) {//podemos buscar los codigos de rederios por nombre o todos
	try {
		console.log(`[store codigoReferidos] findReferido, codigo a buscar '${codigo}'`)

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
		console.log(`[store codigoReferidos] findPremio, '${codigo}'`)

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
		console.log(`[store codigoReferidos] addCodigo, '${fulldata}'`)

		const ref = db.collection(collection).doc(`C${fulldata.codigo}`)
		const codigo = await ref.set(fulldata)
		return { data: codigo, ref: ref }

	} catch (error) {
		throw error
	}

}

async function addReferido(fullData) {
	try {
		console.log(`[store codigoReferidos] addReferido,  '${fullData.codigo}'`)

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
		console.log(`[store codigoReferidos] addPremio, '${fullData.codigo}'`)

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
		console.log(`[store codigoReferidos] putCodigo, '${fullData.codigo}'`)

		const ref = await db.collection(collection).doc(`C${fullData.codigo}`)
		const update = await ref.update({ [key]: fullData[key] + 1 })
		return

	} catch (error) {
		throw error
	}
}

async function findTelefono(telefono) {
	try {
		console.log(`[store codigoReferidos] findTelefono, telefono '${telefono}'`)

		const ref = await db.collection(collection)
		const snapshop = await ref.where('telefono', '==', telefono).get()
		// if (!snapshop) throw (boom.notFound('no hay ningun codigo con este telefono'))
		if (!snapshop) return undefined

		const rta = []
		snapshop.forEach(doc => {
			rta.push({ id: doc.id, ...doc.data() })
		})

		rta.find(element => element.telefono == telefono)
		// if (!rta[0]) throw (boom.notFound('no hay ningun codigo con este telefono'))
		if (!rta[0]) return undefined
		return (rta[0])
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
	findTelefono,
}
