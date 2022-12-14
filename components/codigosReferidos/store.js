const db = require("./../../network/database.js")
const boom = require("@hapi/boom")
const collection = 'codigosReferidos'
const referidos = 'referidos'
const premios = 'premios'

const numeroPremio = 3//el numero de referidos necesarios para tener un premio

function findCodigo(codigo) {//podemos buscar los codigos de rederios por nombre o todos
	return new Promise((resolve, reject) => {
		const ref = db.collection(collection).doc(`C${codigo}`)

		ref
			.get()
			.then((data) => {
				if (!data.data()) return reject(('no hay ningun codigo con este codigo'))//boom.badre
				return resolve(data.data())
			})
			.catch((error) => reject(error))
	})
}

function findReferido(codigo) {//podemos buscar los codigos de rederios por nombre o todos
	return new Promise((resolve, reject) => {
		const ref = db.collection(collection).doc(`C${codigo}`)

		ref.collection(referidos)
			.get()
			.then((data) => {
				const rta = []
				data.forEach(doc => {
					rta.push({ id: doc.id, data: doc.data() })
				})
				return resolve(rta)
			})
			.catch((error) => reject(error))
	})
}

function findPremio(codigo) {//podemos buscar los codigos de rederios por nombre o todos
	return new Promise((resolve, reject) => {
		const ref = db.collection(collection).doc(`C${codigo}`)

		ref.collection(premios)
			.get()
			.then((data) => {
				const rta = []
				data.forEach(doc => {
					rta.push({ id: doc.id, data: doc.data() })
				})
				return resolve(rta)
			})
			.catch((error) => reject(error))
	})
}

function addCodigo(codigo, fulldata) {
	return new Promise(async (resolve, reject) => {
		const ref = db.collection(collection).doc(`C${codigo}`)

		ref.get().then(data => {//comprobamos que no existe ya el codigo
			if (data.data()) { return reject('ya hay codigo con este codigo') }
			ref
				.set(fulldata)
				.then(async (data) => {

					return resolve(data)
				})
				.catch((error) => reject(error))
		})
	})
}

function addReferido(codigo, fulldata) {
	return new Promise(async (resolve, reject) => {
		const ref = db.collection(collection).doc(`C${codigo}`)

		ref.collection('referidos')
			.add(fulldata)
			.then((data) => {
				return resolve(data)
			})
			.catch((error) => reject(error))
	})
}

function addPremio(codigo, date) {
	return new Promise(async (resolve, reject) => {
		const ref = db.collection(collection).doc(`C${codigo}`)

		//comprobamos que tenga sufienetes referidos para dar el premio
		const cantidadPremio = await findPremio(codigo)
		const cantidadReferido = await findReferido(codigo)
		console.log(cantidadReferido.length, numeroPremio, cantidadPremio.length)
		if ((cantidadReferido.length / numeroPremio) > cantidadPremio.length) {
			ref.collection('premios')
				.add({ date })
				.then((data) => {
					return resolve(data)
				})
				.catch((error) => reject(error))
		}
		else {
			reject('no tienes los sufinetes referidos ')
		}


	})
}

module.exports = {
	findCodigo,
	findReferido,
	findPremio,
	addCodigo,
	addReferido,
	addPremio,

}
