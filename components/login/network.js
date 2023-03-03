const express = require("express")
const passport = require("passport")
const response = require("../../network/response.js")
const router = express.Router()


router.post("/", passport.authenticate("local", { session: false }),
	async (req, res, next) => {
		try {
			const user = req.user
			response.success(req, res, user, 200)
		} catch (error) {
			next(error)
		}
	})


module.exports = router
