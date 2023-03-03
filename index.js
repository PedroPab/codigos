const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const router = require("./network/routes.js")
const config = require("./network/config")

//error middelware
const {
    logErrors,
    errorHandler,
    errorBoomHandler,
} = require("./network/middleware/error.js")

const { checkApiKey } = require('./network/middleware/auth')

const app = express()

//app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


app.use(express.static("public"))

// Permitir crox origin en toda la aplicacion
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();

})


router(app)


app.use(logErrors)
app.use(errorBoomHandler)
app.use(errorHandler)

require('./utils/auth/index.js')

//const passport = require('passport')

//app.use(passport.initialize());



app.get("/", checkApiKey,  (req, res) => {
    res.redirect('/codigosReferidos')
})



app.listen(config.PORT, () => {
	console.log(`port ${config.PORT}`)
})
