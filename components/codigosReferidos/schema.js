const Joi = require("joi")

const postCodigo = Joi.object({
	nombre: Joi.string().min(3),
	telefono: Joi.string().min(9),
	codigo: Joi.string().min(3),
	userId: Joi.string(),
	password: Joi.string().min(8)
})

const postReferido = Joi.object({
	nombre: Joi.string().min(3),
	telefono: Joi.string().min(9),
	codigo: Joi.string().min(3)
})

module.exports = { postCodigo, postReferido }
