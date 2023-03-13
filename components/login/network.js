const express = require("express")
const passport = require("passport")
const jwt = require('jsonwebtoken')
const response = require("../../network/response.js")
const config = require("../../network/config.js")
const router = express.Router()

router.post("/", passport.authenticate("local", { session: false }),
	async (req, res, next) => {
		try {
			console.log(`[network] /`);
			const user = req.user
			console.log(user);
			const payload = {
				sub: user.telefono,
				role: user.role,
				id: user.id,
			}
			const token = jwt.sign(payload, config.SECRET)
			const rta = {
				...user,
				token
			}
			response.success(req, res, rta, 200)
		} catch (error) {
			next(error)
		}
	})


module.exports = router
