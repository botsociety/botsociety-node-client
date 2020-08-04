const Botsociety = require('../index')
require('dotenv').config()
describe("Legacy API", function() {
  var config = {
    userId: process.env.USER_ID,
    apiKey: process.env.API_KEY,
    debug: false
  }
  it("auth", function(done) {
    var botsociety = new Botsociety(config).legacy
    const runApi = async()=>{
      const authResponse = await botsociety.auth()
    }
    runApi()
    done()
  })
  it("get conversation", function(done) {
    var botsociety = new Botsociety(config).legacy
    const runApi = async()=>{
      const conversation = await botsociety.getConversations(process.env.B1_DESIGN_ID)
    }
    runApi()
    done()
  })
})