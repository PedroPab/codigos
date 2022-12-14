const { initializeApp, applicationDefault, cert } = require('firebase-admin/app')
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore')
var admin = require("firebase-admin");

const serviceAccount = require("./../serviceAccountKey.json")

initializeApp({
    credential:  admin.credential.cert(serviceAccount),
    databaseURL: "codigos-domi-371522"
});

const db = getFirestore()

        
module.exports = db