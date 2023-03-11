const express = require("express")
const codigosReferidos = require('./../components/codigosReferidos/network.js')
const login = require('./../components/login/network.js')
const users = require('./../components/users/network.js')

const router = (server) => {
    server.use("/codigosReferidos", codigosReferidos)
    server.use("/users", users)
    server.use("/login", login)
}

module.exports = router
