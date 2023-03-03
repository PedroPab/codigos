const express = require("express")
const codigosReferidos = require('./../components/codigosReferidos/network.js')
const login = require('./../components/login/network.js')

const router = (server) => {
    server.use("/codigosReferidos", codigosReferidos)
    server.use("/login", login)
}

module.exports = router
