
/**
 * Botsociety NPM api module
 * Copyright(c) 2017 Botsociety Inc.
 * ISC Licensed
 */

'use strict';

let request = require('request')
let Q = require('q')

module.exports = Botsociety

function Botsociety (config) {
    this.apiUrl = 'https://app.botsociety.io/apisociety'
    this.apiVersion = config.userId || '1.1'
    this.apiSource = 'npm'
    this.userId = config.userId
    this.apiKey = config.apiKey
    this.debug = (!config.debug || config.debug === undefined )? false : config.debug

    this.call = (url)=>{
        let options = {
            url : `${this.apiUrl}/${this.apiVersion}/${this.apiSource}/${url}`,
            method:  'GET',
            headers: {
                'Content-Type' : 'application/json',
                'user_id' : this.userId,
                'api_key_public': this.apiKey
            }
        }
        let deferred = Q.defer();
        request(options,(error, response, body) => {
            this.clog(`RESPONSE STATUS ${response.statusCode}`)

        if(error){
            this.clog(`ERROR`)
            this.clog(`${error}`)
            return deferred.reject(new Error('Error'))
        }
        this.clog(`RESPONSE BODY`)
        this.clog(`${body}`)
        return deferred.resolve(body)
    })
        return deferred.promise
    }

    this.clog = function (message){
        if(this.debug){
            console.log(message)
        }
    }
}

Botsociety.prototype.auth = function(){
    this.clog(`CALLING AUTH`)
    return this.call('')
}

Botsociety.prototype.getConversations = function(conversationId = ''){
    this.clog(`CALLING API CONVERSATIONS/${conversationId}`)
    return this.call(`conversations/${conversationId}`)
}

Botsociety.prototype.getMessage = function(messageId){
    this.clog(`CALLING API MESSAGE/${messageId}`)
    return this.call(`messages/${messageId}`)
}

Botsociety.prototype.getMessageByConversation = function(conversationId, messageId){
    this.clog(`CALLING API MESSAGE/${messageId}`)
    return this.call(`conversations/${conversationId}/messages/${messageId}`)
}

Botsociety.prototype.getVariables = function(conversationId){
    this.clog(`CALLING API VARIABLES/${conversationId}`)
    return this.call(`variables/${conversationId}`)
}