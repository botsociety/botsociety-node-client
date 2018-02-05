
/**
 * Botsociety NPM api module
 * Copyright(c) 2017 Botsociety Inc.
 * ISC Licensed
 */

'use strict';

let request = require('request')
let Q = require('q')

module.exports = Botsociety

function Botsociety(config) {
    this.apiUrl = 'https://app.botsociety.io/apisociety'
    this.apiVersion = '1.1'
    this.apiSource = 'npm'
    this.userId = config.userId
    this.apiKey = config.apiKey
    this.debug = (!config.debug || config.debug === undefined) ? false : config.debug

    this.call = (url, apiVersion) => {
        let localApi = apiVersion || this.apiVersion;
        this.clog(`${this.apiUrl}/${localApi}/${this.apiSource}/${url}`);
        let options = {
            url: `${this.apiUrl}/${localApi}/${this.apiSource}/${url}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'user_id': this.userId,
                'api_key_public': this.apiKey
            }
        }
        let deferred = Q.defer();
        request(options, (error, response, body) => {
            if(response){
                this.clog(`RESPONSE STATUS ${response.statusCode}`)
            }
            if (error) {
                this.clog(`ERROR`)
                this.clog(`${error}`)
                return deferred.reject(error)
            }
            if(response && response.statusCode !== 200){
                this.clog(`ERROR`)
                this.clog(`${body}`)
                return deferred.reject(JSON.parse(body))
            }
            this.clog(`RESPONSE BODY`)
            this.clog(`${body}`)
            return deferred.resolve(JSON.parse(body))
        })
        return deferred.promise
    }

    this.clog = function (message) {
        if (this.debug) {
            console.log(message)
        }
    }
}

Botsociety.prototype.auth = function () {
    this.clog(`CALLING AUTH`)
    return this.call('')
}

Botsociety.prototype.getConversations = function (conversationId = '') {
    let deferred = Q.defer();
    if(typeof conversationId !== 'string'){
        deferred.reject({info: 'Conversation ID must be a string.'})
        return deferred.promise;
    }
    this.clog(`CALLING API CONVERSATIONS/${conversationId}`)
    return this.call(`conversations/${conversationId}`)
}

Botsociety.prototype.getMessage = function (messageId) {
    let deferred = Q.defer();
    if(typeof messageId === 'undefined'){
        deferred.reject({info:'Please, provide a message ID.'});
        return deferred.promise;
    }
    this.clog(`CALLING API MESSAGE/${messageId}`)
    this.clog('getMessage() will be deprecated staring from 2.0, please use getMessageByConversation() instead')
    return this.call(`messages/${messageId}`, '1.0')
}

Botsociety.prototype.getMessageByConversation = function (conversationId, messageId) {
    let deferred = Q.defer();
    if(typeof conversationId === 'undefined' || typeof messageId === 'undefined'){
        deferred.reject({info:'Please, provide two params: a conversation ID and a message ID.'});
        return deferred.promise;
    }
    if(typeof conversationId !== 'string'){
        deferred.reject({info:'Conversation ID must be a string.'});
        return deferred.promise;
    }
    this.clog(`CALLING API MESSAGEBYCONVERSATION/${messageId}`)
    return this.call(`conversations/${conversationId}/messages/${messageId}`)
}

Botsociety.prototype.getVariables = function (conversationId) {
    let deferred = Q.defer();
    if(typeof conversationId === 'undefined'){
        deferred.reject({info:'Please, provide a conversation ID.'});
        return deferred.promise;
    }
    this.clog(`CALLING API conversations/${conversationId}/variables`)
    return this.call(`conversations/${conversationId}/variables/`)
}
