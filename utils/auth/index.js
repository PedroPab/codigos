const passport = require('passport')

const localStrategy = require('./strategis/strategisLocal')

passport.use(localStrategy)


