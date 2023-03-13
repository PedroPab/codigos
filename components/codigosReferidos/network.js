const express = require("express")
const response = require("../../network/response.js")
const controller = require("./controller.js")
const router = express.Router()
const validatorHandler = require("./../../network/middleware/validators/validators.js")
const { postCodigo, postReferido } = require("./schema.js")
const passport = require("passport")
const { checkAdminRoles } = require("../../network/middleware/auth.js")
const controlleUser = require("../users/controller")
const boom = require("@hapi/boom")

router.get("/", async (req, res, next) => {
	try {
		const findsCodigo = await controller.findsCodigo()
		response.success(req, res, findsCodigo, 200)
	} catch (error) {
		next(error)
	}
})

router.get("/:codigo", async (req, res, next) => {
	try {
		const { codigo } = req.params

		const findCodigo = await controller.findCodigo(codigo)
		response.success(req, res, findCodigo, 200)
	} catch (error) {
		next(error)
	}
})

router.get("/referido/:codigo",
	passport.authenticate('jwt', { session: false }),
	checkAdminRoles(['admin', 'client']), async (req, res, next) => {
		try {
			let { codigo } = req.params

			if (codigo == undefined) {
				console.log(codigo, 'jj');

				codigo = controller.findUserByPhone(req.user.sub)

			}
			console.log(codigo, 'jj');

			const findReferido = await controller.findReferido(codigo)
			response.success(req, res, findReferido, 200)
		} catch (error) {
			next(error)
		}
	})

router.get("/premio/:codigo", async (req, res, next) => {
	try {
		const { codigo } = req.params

		const findPremio = await controller.findPremio(codigo)
		response.success(req, res, findPremio, 200)
	} catch (error) {
		next(error)
	}
})

router.post("/",
	passport.authenticate('jwt', { session: false }),
	checkAdminRoles(['admin', 'client']),
	validatorHandler(postCodigo, "body"), async (req, res, next) => {
		try {
			const { codigo } = req.body
			let user = req.user
			if (req.user.role == 'admin') {
				const userCodigo = await controlleUser.findUser({ id: req.body.userId })
				user = userCodigo[0]
				if (!user) throw boom.conflict('ingresa un id de usuari para asignar el codigo nuevo')
			}

			const fullData = {
				codigo,
				user: user
			}
			console.log('fullData', fullData);
			const addCodigo = await controller.addCodigo(fullData)
			response.success(req, res, addCodigo, 200)

		} catch (error) {
			next(error)
		}
	})

router.post("/referido/:codigo", validatorHandler(postReferido, "body"), async (req, res, next) => {
	try {
		const { codigo } = req.params
		const { nombre, telefono } = req.body
		const fullData = {
			nombre, telefono, codigo
		}
		const addReferido = await controller.addReferido(fullData)
		response.success(req, res, addReferido, 200)

	} catch (error) {
		next(error)
	}
})

router.post("/premio/:codigo",
	passport.authenticate('jwt', { session: false }),
	checkAdminRoles(['admin']),
	async (req, res, next) => {
		try {
			const { codigo } = req.params

			const addPremio = await controller.addPremio(codigo)
			response.success(req, res, addPremio, 200)

		} catch (error) {
			next(error)
		}
	})

module.exports = router
