const express = require("express")
const codigosReferidos = require('./../components/codigosReferidos/network.js')

const router = (server) => {
    server.use("/codigosReferidos", codigosReferidos)
}

module.exports = router
