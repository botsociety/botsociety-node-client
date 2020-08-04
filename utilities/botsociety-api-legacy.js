let request = require("request") //TODO: Get rid of request
let Q = require("q")
module.exports = Legacy
function Legacy(config) {
  this.apiUrl = "https://app.botsociety.io/apisociety"
  this.apiVersion = "2.0"
  this.apiSource = "npm"
  this.userId = config.userId
  this.apiKey = config.apiKey
  this.debug = config.debug || false

  let clog = message => {
    if (this.debug) {
      console.log(message)
    }
  }

  let call = (url, method = "GET", body = null) => {
    clog(`${this.apiUrl}/${this.apiVersion}/${this.apiSource}/${url}`)
    let options = {
      url: `${this.apiUrl}/${this.apiVersion}/${this.apiSource}/${url}`,
      method: method,
      headers: {
        "Content-Type": "application/json",
        user_id: this.userId,
        api_key_public: this.apiKey
      }
    }
    if (body) {
      options.body = JSON.stringify(body)
    }
    let deferred = Q.defer()
    request(options, (error, response, body) => {
      if (response) {
        clog(`RESPONSE STATUS ${response.statusCode}`)
      }
      if (error) {
        clog(`ERROR`)
        clog(`${error}`)
        return deferred.reject(error)
      }
      if (response && response.statusCode !== 200) {
        clog(`ERROR`)
        clog(`${body}`)
        return deferred.reject(JSON.parse(body))
      }
      clog(`RESPONSE BODY`)
      clog(`${body}`)
      return deferred.resolve(JSON.parse(body))
    })
    return deferred.promise
  }

  this.auth = function() {
    clog(`CALLING AUTH`)
    return call("")
  }

  /* Conversations */
  this.createConversation = body => {
    clog(`CALLING API CREATE CONVERSATION`)
    return call(`conversations/`, "POST", body)
  }

  this.getConversations = (conversationId = "") => {
    let deferred = Q.defer()
    if (typeof conversationId !== "string") {
      deferred.reject({ info: "Conversation ID must be a string." })
      return deferred.promise
    }
    clog(`CALLING API CONVERSATIONS/${conversationId}`)
    return call(`conversations/${conversationId}`)
  }

  this.deleteConversation = conversationId => {
    clog(`CALLING API DELETE CONVERSATION/${conversationId}`)
    return call(`conversations/${conversationId}`, "DELETE")
  }

  /* Messages */
  this.addMessage = (conversationId, body) => {
    clog(`CALLING API ADD MESSAGE`)
    return call(`conversations/${conversationId}/messages/`, "POST", body)
  }

  this.linkMessage = (conversationId, body) => {
    clog(`CALLING API LINK MESSAGE`)
    return call(`conversations/${conversationId}/link`, "POST", body)
  }

  this.unlinkMessage = (conversationId, body) => {
    clog(`CALLING API UNLINK MESSAGE`)
    return call(`conversations/${conversationId}/unlink`, "POST", body)
  }
  /**
   * @deprecated
   */
  this.getMessage = () => {
    throw "getMessage() is deprecated, use getMessageByConversation(conversationId, messageId) instead"
  }

  this.getMessageByConversation = (conversationId, messageId) => {
    let deferred = Q.defer()
    if (
      typeof conversationId === "undefined" ||
      typeof messageId === "undefined"
    ) {
      deferred.reject({
        info: "Please, provide two params: a conversation ID and a message ID."
      })
      return deferred.promise
    }
    if (typeof conversationId !== "string") {
      deferred.reject({ info: "Conversation ID must be a string." })
      return deferred.promise
    }
    clog(`CALLING API MESSAGEBYCONVERSATION/${messageId}`)
    return call(`conversations/${conversationId}/messages/${messageId}`)
  }

  this.deleteMessage = (conversationId, messageId) => {
    clog(`CALLING API DELETE MESSAGE/${messageId}`)
    return call(
      `conversations/${conversationId}/messages/${messageId}`,
      "DELETE"
    )
  }

  /* Variables */
  this.addVariables = (conversationId, body) => {
    clog(`CALLING API ADD VARIABLES`)
    return call(`conversations/${conversationId}/variables/`, "POST", body)
  }

  this.getVariables = conversationId => {
    let deferred = Q.defer()
    if (typeof conversationId === "undefined") {
      deferred.reject({ info: "Please, provide a conversation ID." })
      return deferred.promise
    }
    clog(`CALLING API conversations/${conversationId}/variables`)
    return call(`conversations/${conversationId}/variables/`)
  }
}