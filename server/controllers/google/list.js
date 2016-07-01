/**
 * List files in a Google Drive folder
 */
module.exports = function * (next) {
  var self = this
  var Purest = require('purest')
  var google = new Purest({provider: 'google', api: 'drive'})

  yield function listFiles (cb) {
    // Query filters based on a file's parents
    var query = `'${self.query.dir}' in parents and trashed=false`

    google.get('files', {
      auth: {
        bearer: self.session.google.token
      },
      qs: {
        q: query
      }
    }, function (err, res, body) {
      if (err) {
        console.log('error time!')
        self.body = 'Error: ' + err
        return cb()
      }
      console.log(body.length)
      self.body = body

      cb()
    })
  }
}
