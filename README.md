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
            <td>This is your user ID. You can find it <a target="_blank" href="https://app.botsociety.io/#/account">here</a> </td>
        </tr>
        <tr>
            <td>apiKey</td>
            <td>String</td>
            <th></th>
            <td>yes</td>
            <td>This is your api key. You can find it <a target="_blank" href="https://app.botsociety.io/#/account">here</a> </td>
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
