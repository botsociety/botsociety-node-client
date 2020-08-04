# Botsociety API Node Client

[![NPM](https://nodei.co/npm/botsociety.png)](https://nodei.co/npm/botsociety/)

[![botsociety](https://circleci.com/gh/botsociety/botsociety-node-client.svg?style=svg)](https://circleci.com/gh/botsociety/botsociety-node-client)

Npm module to retrieve automagically the content of your designs from botsociety.io

## Quick start

```bash
npm install
```

Retrieve your User Id and API key from the <a target="_blank" href="https://app.botsociety.io/#/account">API panel in Botsociety</a>.
Once you have the credentials:

```javascript
var config = {
    userId: process.env.USER_ID,
    apiKey: process.env.API_KEY
}
var botsociety = new Botsociety(config)
botsociety.getConversation("Your design id here)
.then(function(data) {
    // Your conversation data will be here
})
```

A more detailed example of your conversation data.

Example of a structure of a message object:

```javascript
var botsociety = new Botsociety(config)
botsociety.getConversation("Your design id here)
.then(function(data) {
    data.messages.forEach(function(message) { // Loop through your messages
         console.log(message.id) // Your message id
         console.log(message.pathId) // The path this message belongs to
         Object.Keys(message.attachments).forEach(function(key) {
             console.log(message.attachments[key][0]) // The message's attachment
             message.attachments[key][0].forEach(function(element) {
                 console.log(element) //the single Message element
                 Object.keys(element.values).forEach(function(utteranceId) { // Looping through your message utterances
                    console.log(Object.values(element.values[utteranceId])) // The content of your utterance
                 })
             })
         })
    })
```

Example of an intentsInfo object, that contains the data to train your NLP engine and for your dialog manager:

```javascript
    Object.keys(data.intentsInfo).forEach(function(intentId) { // Loop through the intents
        var intent = data.intentsInfo(intentId)

        intent.parameters.forEach(function(parameter) { // Loop through the messages assigned to this intent
            parameter.ai.forEach(function(AiMessage) {
                console.log(aiMessage) // The messages sent by a bot that have this intent assigned
            })
            parameter.user.forEach(function(UserMessage) {
                console.log(UserMessage) //  The messages sent by a user that have this intent assigned
            })
        })

        intent.nlp.forEach(function(nlp) { // The messages sent by users in order to trigger this intent
            console.log(nlp.messageInfo) // An object simpler than the message object, where you can retrieve your message text content
            /* Example of message Info
                ssmlTexts: [],
                ssmlPlainTexts: [],
                textComponents: [ "I don't get it", 'What can you do?' ],
                imageComponents: [],
                chips: [],
                cards: [],
                videoComponents: [],
                nextMessageIds: [ '5efa534f17defcfc98c45a5d' ]
            */

           console.log(nlp.message) // The complete message object
        })

        intent.responses.forEach(function(response) { // The messages sent by bot in response to an intent
            console.log(response.messageInfo) // An object simpler than the message object, where you can retrieve your message text content
            console.log(response.message) // The complete message object
        })
    })
})
```

For an example of the conversation object, refer to the <a target="_blank" href="https://botsociety.io/documentation/api">documentation</a>.

## API Documentation

You can find [here the full API Reference](https://botsociety.io/documentation/api/)

## Get your user ID and API key

Sign up at <a target="_blank" href="https://app.botsociety.io/signup">botsociety.io</a> (it's free!)

Go to the <a target="_blank" href="https://app.botsociety.io/#/account">account page</a> to generate the API key.

## Building a Custom Integration

With the Botsociety API, you can build a custom Botsociety Export. It will to export your Botsociety designs to a bot building solution. You can build a custom integration for your organisation, or you can submit one to be published on Botsociety. The Botsociety team will review your custom integration and then add it to Botsociety. Learn more about publishing integrations here.

If you are interested in building a Custom Integration, a good place to start is this boiler plate. Also check out this CSV Export example.
Current integrations include:
- <a target="_blank" href="https://botsociety.io/documentation/build-mode/#exporting-to-dialogflow">Dialogflow</a>
- <a target="_blank" href="https://botsociety.io/documentation/build-mode/#exporting-to-rasa">Rasa (in developer preview)</a>

## Legacy API

The legacy API is available for the designs created on Botsociety1. The Legacy API is still supported but it will not receive new updates. If you are looking to build a new integration, you should use the new API for Botsociety2.

To use the Legacy (Botsociety1) API:

```javascript
var botsociety = new Botsociety(config).legacy
```

Then call the usual methods:

```javascript
botsociety.auth()
botsociety.getConversations()
```
Available methods:
- auth()
- createConversation()
- getConversations()
- getConversations(conversationId)
- deleteConversation(conversationId)
- addMessage(conversationId, messageId)
- linkMessage(conversationId, body)
- unlinkMessage(conversationId, body)
- getMessageByConversation(conversationId, messageId)
- deleteMessage(conversationId, messageId)
- addVariables(conversationId, body)
- getVariables(conversationId)

For more information, check out the <a target="_blank" href="https://api.botsociety.io/">Legacy API</a>

## License (ISC)

See the [LICENSE file](LICENSE) for details.

## Contributing

We love pull requests from everyone.
In general, we follow the "fork-and-pull" Git workflow.

1. **Fork** the repo on GitHub
2. **Clone** the project to your own machine
3. **Commit** changes to your own branch
4. **Push** your work back up to your fork
5. Submit a **Pull request** so that we can review your changes

At this point you're waiting on us. We like to at least comment on pull requests
within three business days (and, typically, one business day). We may suggest
some changes or improvements or alternatives.

Remember to write a [good commit message][commit].

[commit]: http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html

NOTE: Be sure to merge the latest version before making a pull request!
