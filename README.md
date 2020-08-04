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
.then(function(data) { // Your conversation data will be here
    data.messages.forEach // Cycle through your messages
})
```

For an example of the conversation object, refer to the <a target="_blank" href="https://botsociety.io/documentation/api">documentation</a>.

## API Documentation

[API Reference](https://botsociety.io/documentation/api/)

## Get your user ID and API key

Sign up at <a target="_blank" href="https://app.botsociety.io/signup">botsociety.io</a> (it's free!)

Go to the <a target="_blank" href="https://app.botsociety.io/#/account">account page</a> to generate the API key.

## Export module boilerplate

With the Botsociety API, you can build a custom Botsociety Export - to export your Botsociety designs to a bot building solution. You can start from this boiler plate. Also check out this CSV Export example.

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

You can use all of the methods of the Legacy API:

- [`testing API auth`](https://api.botsociety.io/?version=latest#d591095d-ada5-4142-a8bc-ce056e32762d)
- [`create a conversation`](https://api.botsociety.io/?version=latest#a3490e0c-92f3-4539-899a-90d45ce74387)
- [`retrieve all conversations`](https://api.botsociety.io/?version=latest#efc6df77-947d-496f-ac71-5ebdd0e86bf8)
- [`retrieve single conversation`](https://api.botsociety.io/?version=latest#ed6b6fcd-e207-428b-a2f8-b9ac73a66c83)
- [`delete a conversation`](https://api.botsociety.io/?version=latest#6346a231-db4c-4fb0-93e3-516afc081689)
- [`create a new message attached to a conversation`](https://api.botsociety.io/?version=latest#3f534a44-b5fe-4f6f-af6e-04eca635e97c)
- [`link a message to another message in the same conversation`](https://api.botsociety.io/?version=latest#717c5724-8534-4479-b28c-6dc2ef3091f9)
- [`remove an existing link connection between two messages`](https://api.botsociety.io/?version=latest#c93e831d-0538-4f4a-89cc-69c9838b0832)
- [`retrieve a message from a conversation`](https://api.botsociety.io/?version=latest#614df83b-9b9b-41a3-8931-0b1ee1f1ef8e)
- [`delete a message from a conversation`](https://api.botsociety.io/?version=latest#4985d901-9b91-4ee5-bdee-09d47f7d3375)
- [`add variables to a conversation`](https://api.botsociety.io/?version=latest#529014e3-116e-43c7-b23a-3c166b7b935b)
- [`retrieve variables from a conversation`](https://api.botsociety.io/?version=latest#9e1e9ba1-e8bf-429e-a875-44027d81bde5)

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
