const passport = require('passport')

const localStrategy = require('./strategis/strategisLocal')
const strategisJwt = require('./strategis/strategisJwt')

passport.use(localStrategy)
passport.use(strategisJwt)



