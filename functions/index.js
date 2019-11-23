const Bible = require('./controller')
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.bible = functions.https.onRequest(async (req, res) => {
    const bibleV = new Bible(
        req.query.language,
        req.query.version
        ).get(
            req.query.book,
            req.query.chapter,
            req.query.verse
            )

    res.send(bibleV); 
  });