const Joi = require("joi")

const postUser = Joi.object({
	role: Joi.string().valid('admin', 'cliente'),
	token: Joi.string().when('role', {
    is: ('admin'),
    then: Joi.string().required(),
    otherwise: Joi.string()
  }),
	nombre: Joi.string().min(3).required(),
	telefono: Joi.string().min(9).required(),
	password: Joi.string().min(8).required()
})

module.exports = { postUser }
