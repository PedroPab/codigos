const store = require("./store.js")
const boom = require("@hapi/boom")

async function findsCodigo() {//podemos buscar los codigos de rederios por nombre o todos
	try {
		const codigoFind = await store.findsCodigo()
		return codigoFind
	} catch (error) {
		throw error
	}

}

async function findCodigo(codigo) {//podemos buscar los codigos de rederios por nombre o todos
	try {
		const codigoFind = await store.findCodigo(codigo)
		return codigoFind
	} catch (error) {
		throw error
	}


}

async function findReferido(codigo) {
	try {
		const codigoFind = await findCodigo(codigo)
		const findReferido = await store.findReferido(codigo)
		return findReferido
	} catch (error) {
		throw error
	}
}

async function findPremio(codigo) {
	try {
		const codigoFind = await findCodigo(codigo)
		const findPreimo = await store.findPremio(codigo)
		return findPreimo
	} catch (error) {
		throw error

	}

}

async function addCodigo(data) {
	try {
		const fullData = {
			...data,
			date: new Date(),
			totalReferidos: 0,
			totalPremios: 0,
		}
		try {//mira ya esta crado y si manda el erro de de que no hay ningun codigo con ese codo se va al cath y ejecuta el creador de codigo
			const codigoFind = await findCodigo(fullData.codigo)
		} catch (error) {
			const addReferido = await store.addCodigo(fullData)
			return fullData
		}


		throw boom.badRequest('ya existe in codigo con este codigo')



		return
	} catch (error) {
		throw error
	}

}

async function addReferido(data) {
	try {
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
		const fullData = {
			codigo, date: new Date()
		}
		const codigoFind = await findCodigo(fullData.codigo)	
		if ((codigoFind.totalReferidos / 3) <= codigoFind.totalPremios) {

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
		const codigoFind = await store.findCodigo(codigo)
		const put = await store.putCodigo(codigoFind, key)//le mandamos todo  la data para saber cual es la cantidad antes de actualisar
		return put
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
}
