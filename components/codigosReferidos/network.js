const express = require("express")
const response = require("../../network/response.js")
const controller = require("./controller.js")
const router = express.Router()
const validatorHandler = require("./../../network/middleware/validators/validators.js")
const { postCodigo, postReferido } = require("./schema.js")

router.get("/:codigo", (req, res, next) => {
	const { codigo } = req.params

	controller.findCodigo(codigo)
		.then((data) => {
			response.success(req, res, data, 200)
		})
		.catch((error) => {
			next(error)
		})
})

router.get("/referido/:codigo", (req, res, next) => {
	const { codigo } = req.params

	controller.findReferido(codigo)
		.then((data) => {
			response.success(req, res, data, 200)
		})
		.catch((error) => {
			next(error)
		})
})

router.get("/premio/:codigo", (req, res, next) => {
	const { codigo } = req.params

	controller.findPremio(codigo)
		.then((data) => {
			response.success(req, res, data, 200)
		})
		.catch((error) => {
			next(error)
		})
})

router.post("/", validatorHandler(postCodigo, "body"), (req, res, next) => {
	const { nombre, telefono, codigo } = req.body
	const fullData = {
		nombre, telefono, codigo, date: new Date()
	}
	controller
		.addCodigo(codigo, fullData)
		.then((data) => {
			response.success(req, res, data, 200)
		})
		.catch((error) => {
			next(error)
		})
})

router.post("/referido/:codigo", validatorHandler(postReferido, "body"), (req, res, next) => {
	const { codigo } = req.params
	const { nombre, telefono } = req.body
	const fullData = {
		nombre, telefono, codigo, date: new Date()
	}
	controller
		.addReferido(codigo, fullData)
		.then((data) => {
			response.success(req, res, data, 200)
		})
		.catch((error) => {
			next(error)
		})
})

router.post("/premio/:codigo", (req, res, next) => {
	const { codigo } = req.params
	const date = new Date()

	controller
		.addPremio(codigo, date)
		.then((data) => {
			response.success(req, res, data, 200)
		})
		.catch((error) => {
			next(error)
		})
})

module.exports = router
