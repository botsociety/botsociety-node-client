# Botsociety api
[![NPM](https://nodei.co/npm/botsociety.png)](https://nodei.co/npm/botsociety/)

Npm module to retrieve automagically the content of your chatbot designs from botsociety.io

You can find more details about our api at https://botsociety.docs.apiary.io

## What you can do
- [`testing api auth`](https://botsociety.docs.apiary.io/#reference/0/auth/auth)
- [`retrieve all conversations`](https://botsociety.docs.apiary.io/#reference/0/list-conversations)
- [`retrieve single conversation`](https://botsociety.docs.apiary.io/#reference/0/get-conversation)
- [`retrieve all messages for a specific conversation`](https://botsociety.docs.apiary.io/#reference/0/get-message)

## Methods
- auth()
- getConversations()
- getConversations(conversationId)
- getMessage(messageId)


## Configuration
<table class="table table-bordered table-striped">
    <thead>
        <tr>
            <th style="width: 100px;">name</th>
            <th style="width: 50px;">type</th>
            <th>default</th>
            <th>required</th>
            <th>description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>userId</td>
            <td>String</td>
            <th></th>
            <td>yes</td>
            <td>This is your user ID. You can find it in your <a target="_blank" href="https://app.botsociety.io/#/account">Botsociety Profile page</a> </td>
        </tr>
        <tr>
            <td>apiKey</td>
            <td>String</td>
            <th></th>
            <td>yes</td>
            <td>This is your api key. You can find it in your <a target="_blank" href="https://app.botsociety.io/#/account">Botsociety Profile page</a> </td>
        </tr>
        <tr>
            <td>debug</td>
            <td>Boolean</td>
            <th>false</th>
            <td>no</td>
            <td>Set to `true`, some debugging messages will be displayed on console</td>
        </tr>
    </tbody>
</table>

## Usage example

```js
let Botsociety = require('botsociety')

let config = {
  userId : 'YOUR-USER-ID',
  apiKey : 'YOUR-API-KEY',
  debug : false
}

let botsociety = new Botsociety(config)

botsociety.auth().then(response => {
  console.log(response)
});

botsociety.getConversations().then(response => {
  console.log(response)
});

botsociety.getConversations('CONVERSATION-ID').then(response => {
  console.log(response)
});

botsociety.getMessage('MESSAGE-ID').then(response => {
  console.log(response)
});
```

## License
ISC

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

