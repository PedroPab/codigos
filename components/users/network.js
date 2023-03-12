const express = require("express")
const response = require("../../network/response.js")
const controller = require("./controller.js")
const router = express.Router()
const validatorHandler = require("../../network/middleware/validators/validators.js")
const config = require("../../network/config.js")
const jwt = require('jsonwebtoken')
const { postUser } = require("./schema.js")
const boom = require("@hapi/boom")
const { authenticate } = require("passport")
const passport = require("passport")

router.post("/", validatorHandler(postUser, "body"), async (req, res, next) => {
	try {
		const data = req.body

		if (data.role == 'admin') {
			try {
				const verificado = jwt.verify(data.token, config.SECRET)

			} catch (error) {
				throw boom.unauthorized('token incorrecto')
			}
		}
		const newUser = await controller.addUser({ ...data })

		response.success(req, res, newUser, 200)

	} catch (error) {
		next(error)
	}
})

router.get("/:telefono", passport.authenticate('jwt', { session: false }), async (req, res, next) => {
	try {
		const { telefono } = req.params
		console.log(telefono);
		const user = await controller.findUser({ telefono })

		response.success(req, res, user, 200)

	} catch (error) {
		next(error)
	}
})

router.get("/establecerContraseña/:telefono", async (req, res, next) => {
	try {
		const { telefono } = req.params
		const user = await controller.findUser({ telefono })

		response.success(req, res, user, 200)

	} catch (error) {
		next(error)
	}
})

module.exports = router
