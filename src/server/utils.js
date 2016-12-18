var uuid = require('uuid')

module.exports.generateUUID = function () {
  return uuid.v4()
}

module.exports.getProvider = function (options) {
  var providers = {
    dropbox: require('./provider/dropbox'),
    drive: require('./provider/drive')
  }

  var providerName = options.providerName

  if (!providers[providerName]) {
    throw new Error('Non-existing provider! -> ' + providerName)
  }

  return new providers[providerName](options)
}