const store = require("./store.js")
const boom = require("@hapi/boom")

function findCodigo(codigo) {//podemos buscar los codigos de rederios por nombre o todos
	return new Promise((resolve, reject) => {
		store.findCodigo(codigo)
			.then(data => {
				resolve(data)
			})
			.catch(error => reject(error))
	})
}

function findReferido(codigo) {
	return new Promise((resolve, reject) => {
		store.findReferido(codigo)
			.then(data => {
				resolve(data)
			})
			.catch(error => reject(error))
	})
}

function findPremio(codigo) {
	return new Promise((resolve, reject) => {
		store.findPremio(codigo)
			.then(data => {
				resolve(data)
			})
			.catch(error => reject(error))
	})
}

function addCodigo(codigo, fullData) {
	return new Promise((resolve, reject) => {
		store.addCodigo(codigo, fullData)
			.then(data => {
				resolve(data)
			})
			.catch(error => reject(error))
	})
}

function addReferido(codigo, fullData) {
	return new Promise(async (resolve, reject) => {

		store.addReferido(codigo, fullData)
			.then(data => {
				resolve(data)
			})
			.catch(error => reject(error))
	})
}

function addPremio(codigo, date) {
	return new Promise(async (resolve, reject) => {
		//reviasmso que si este valido a resivir premios
		////...

		store.addPremio(codigo, date)
			.then(data => {
				resolve(data)
			})
			.catch(error => reject(error))
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
