const store = require("./store.js")
const boom = require("@hapi/boom")
const bcrypt = require('bcrypt')
const controllerUser = require("../users/controller.js")


async function findsCodigo() {//podemos buscar los codigos de rederios por nombre o todos
	try {
		console.log('[controller codigosReferidos] findsCodigo')

		const codigoFind = await store.findsCodigo()
		return codigoFind
	} catch (error) {
		throw error
	}

}

async function findCodigo(codigo) {//podemos buscar los codigos de rederios por nombre o todos
	try {
		console.log('[controller codigosReferidos] findcodigo ')
		const codigoFind = await store.findCodigo(codigo)
		delete codigoFind.password
		return codigoFind
	} catch (error) {
		throw error
	}
}

async function findCodigoPass(codigo) {//podemos buscar los codigos de rederios por nombre o todos
	try {
		console.log('[controller codigosReferidos] findcodigo ')
		const codigoFind = await store.findCodigo(codigo)
		return codigoFind
	} catch (error) {
		throw error
	}
}

async function findReferido(codigo) {
	try {
		console.log('[controller codigosReferidos] findReferido')

		const codigoFind = await findCodigo(codigo)
		const findReferido = await store.findReferido(codigo)
		return findReferido
	} catch (error) {
		throw error
	}
}

async function findPremio(codigo) {
	try {
		console.log('[controller codigosReferidos] findPremio')

		const codigoFind = await findCodigo(codigo)
		const findPreimo = await store.findPremio(codigo)
		return findPreimo
	} catch (error) {
		throw error

	}

}

async function addCodigo(data) {
	try {
		console.log('[controlle codigoFereridos] addCodigo ')
		const codigoFind = await findCodigoPass(data.codigo)
		if (codigoFind) throw boom.badRequest('ya existe in codigo con este codigo')
		const user = await controllerUser.findUserFull(data.user.id)
		console.log('[controlle codigoFereridos] addCodigo , creando nuevo codigo')
		const fullData = {
			codigo: data.codigo,
			user: user.ref,
			date: new Date(),
			totalReferidos: 0,
			totalPremios: 0,
		}
		const addCodigo = await store.addCodigo(fullData)
		let listaCodigo = [addCodigo.ref]
		if (user.data.codigos) {
			listaCodigo = [...user.data.codigos, addCodigo.ref]
		}
		const addNewCodigoInUser = await controllerUser.userUpdate({ codigos: listaCodigo }, user.data)
		delete fullData
		return fullData
	} catch (error) {
		throw error
	}

}

async function addReferido(data) {
	try {
		console.log('[controller codigosReferidos] addReferido')

		const fullData = {
			...data,
			date: new Date()
		}

		const codigoFind = await findCodigo(fullData.codigo)
		const addReferido = await store.addReferido(fullData)
		const update = await updateCodigo(fullData.codigo, 'totalReferidos')
		const codigoFind1 = await findCodigo(fullData.codigo)//le mandamos el codigo actulaisado

		return codigoFind1
	} catch (error) {
		throw error
	}

}

async function addPremio(codigo) {
	try {
		console.log('[controller codigosReferidos] addPremio')

		const fullData = {
			codigo, date: new Date()
		}
		const codigoFind = await findCodigo(fullData.codigo)
		if (Math.floor(codigoFind.totalReferidos / 3) <= codigoFind.totalPremios) {

			throw boom.conflict('no tienes los sufinetes referidos ')
		}

		const addPremio = await store.addPremio(fullData)
		const update = await updateCodigo(fullData.codigo, 'totalPremios')
		const codigoFind1 = await findCodigo(fullData.codigo)//le mandamos el codigo actulaisado

		return codigoFind1
	} catch (error) {
		throw error
	}
}

async function updateCodigo(codigo, key) {//para actualizar ya sea el numeto de referido o premio en uno en uno 
	try {
		console.log('[controller codigosReferidos] updateCodigo, codigo:', codigo, key)
		const codigoFind = await store.findCodigo(codigo)
		console.log('cnodoi', codigoFind)
		if (!codigoFind) throw boom.badData('no existe este codigo')
		const put = await store.putCodigo(codigoFind, key)//le mandamos todo  la data para saber cual es la cantidad antes de actualisar
		return put
	} catch (error) {
		throw error
	}
}

async function findUserByPhone(telefono) {//podemos buscar los codigos de rederios por nombre o todos
	try {
		console.log('[controller codigosReferidos] findUserByPhone ')
		const user = await store.findTelefono(telefono)

		return user
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
	findCodigoPass,
	findUserByPhone,
}
