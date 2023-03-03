const express = require("express")
const response = require("../../network/response.js")
const controller = require("./controller.js")
const router = express.Router()
const validatorHandler = require("./../../network/middleware/validators/validators.js")
const { postCodigo, postReferido } = require("./schema.js")

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

router.get("/referido/:codigo", async (req, res, next) => {
	try {
		const { codigo } = req.params

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

router.post("/", validatorHandler(postCodigo, "body"), async (req, res, next) => {
	try {
		const { nombre, telefono, codigo, password } = req.body
		const fullData = {
			nombre, telefono, codigo, password
		}
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

router.post("/premio/:codigo", async (req, res, next) => {
	try {
		const { codigo } = req.params

		const addPremio = await controller.addPremio(codigo)
		response.success(req, res, addPremio, 200)

	} catch (error) {
		next(error)
	}
})

module.exports = router
