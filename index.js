/**
 * Botsociety NPM api module
 * Copyright(c) 2020 Botsociety Inc.
 * ISC Licensed
 */

"use strict"

//let request = require("request")
let Q = require("q")
let Legacy = require('./utilities/botsociety-api-legacy');
let Utilities = require('./utilities/botsociety-api.utilities');

module.exports = Botsociety

function Botsociety(config) {
  this.apiUrl = "https://app.botsociety.io"
  this.domain = "app.botsociety.io"
  this.apiVersion = "2.0"
  this.apiSource = "npm"
  this.userId = config.userId
  this.apiKey = config.apiKey
  this.debug = !config.debug || config.debug === undefined ? false : config.debug
  var completeConfig = {...{domain: this.domain}, ...config}
  //console.log(completeConfig)
  this.legacy = new Legacy(config)
  this.utilities = new Utilities(completeConfig)
  //this.apiUtilities = new ApiUtilities(this.apiUrl, this.userId, this.apiKey)

  this.getConversation = function(conversationId, deviceToExport=undefined) {
    return this.utilities.getConversation(conversationId, deviceToExport)
  }

}