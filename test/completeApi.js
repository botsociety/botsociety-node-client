const Botsociety = require('../index')
require('dotenv').config()
describe("API", function () {
  var config = {
    userId: process.env.USER_ID,
    apiKey: process.env.API_KEY,
    debug: false
  }
  it("get conversation", function (done) {
    this.timeout(3000)
    var botsociety = new Botsociety(config)
    botsociety.getConversation(process.env.B2_DESIGN_ID)
      .then(function (data) {
        if (!data.devices || data.devices.length == 0) {
          return done(new Error("Devices length zero"))
        }
        if (!data.designInfo || data.intentsInfo.length == 0) {
          return done(new Error("designInfo length zero"))
        }
        if (!data.messages || data.messages.length == 0) {
          return done(new Error("intentsInfo length zero"))
        }
        if (!data.persons || data.persons.length == 0) {
          return done(new Error("persons length zero"))
        }
        if (!data.messages || data.messages.length == 0) {
          return done(new Error("messages length zero"))
        }
        if (!data.paths || data.paths.length == 0) {
          return done(new Error("paths length zero"))
        }
        if (!data.intents || data.intents.length == 0) {
          return done(new Error("intents length zero"))
        }
        if (!data.intentsInfo || data.intentsInfo.length == 0) {
          return done(new Error("intentsInfo length zero"))
        }
        if (!data.variablesInfo || data.variablesInfo.length == 0) {
          return done(new Error("intentsInfo length zero"))
        }
        return done()
      })
      .catch(function (err) {
        return done(err)
      })
  })
})