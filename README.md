# Botsociety API
[![NPM](https://nodei.co/npm/botsociety.png)](https://nodei.co/npm/botsociety/)

Npm module to retrieve automagically the content of your chatbot designs from botsociety.io

You can find more details about our API at https://botsociety.docs.apiary.io

## What you can do
- [`testing API auth`](https://botsociety.docs.apiary.io/#reference/0/auth/auth)
- [`retrieve all conversations`](https://botsociety.docs.apiary.io/#reference/0/list-conversations)
- [`retrieve a single conversation`](https://botsociety.docs.apiary.io/#reference/0/get-conversation)
- [`retrieve all messages for a specific conversation`](https://botsociety.docs.apiary.io/#reference/0/get-message)
- [`retrieve all variables for a specific conversation`](https://botsociety.docs.apiary.io/#reference/0/get-variables/get-variables)

## Methods
- auth()
- getConversations()
- getConversations(conversationId)
- getMessageByConversation(conversationId, messageId)
- getConversationVariables(conversationId)
- getMessage(messageId) - DEPRECATED

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
            <td>This is your API key. You can find it in your <a target="_blank" href="https://app.botsociety.io/#/account">Botsociety Profile page</a> </td>
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

## Get your user ID and API key
Sign up at <a target="_blank" href="https://app.botsociety.io/signup">botsociety.io</a> (it's free!)

Go to the <a target="_blank" href="https://app.botsociety.io/#/account">account page</a>

Generate the API key

## Usage example

```js
let Botsociety = require('botsociety')

let config = {
  userId : 'YOUR-USER-ID',
  apiKey : 'YOUR-API-KEY',
  debug : false
}

let botsociety = new Botsociety(config)
```
### auth()
```js
botsociety.auth().then(response => {
  console.log(response)
  //Example response object:
  //   {
  //     "auth": true,
  //     "info": "You are successfully calling the API. This is just a test API to check your authentication params."
  //   }
});
```
### getConversations()
```js
botsociety.getConversations().then(response => {
 console.log(response)
    // Example response from a user with 2 different mockups
    // [
    //     {
    //         "_id": "5a72e561f34eeb072c293cfd",
    //         "updatedAt": "2018-02-01T10:01:30.137Z",
    //         "createdAt": "2018-02-01T10:01:05.751Z",
    //         "name": "Test Mockup mockup",
    //         "_converted_from": null,
    //         "_cloned_from": null,
    //         "scenario": null,
    //         "selected_variant": "white",
    //         "selected_model": "iphone6",
    //         "channel": "facebook",
    //         "createdByMe": true
    //     },
    //     {
    //         "_id": "5a72e7f1f34eeb072c293d02",
    //         "updatedAt": "2018-02-01T10:12:37.937Z",
    //         "createdAt": "2018-02-01T10:12:01.037Z",
    //         "name": "Test Bot 2 mockup",
    //         "_converted_from": null,
    //         "_cloned_from": null,
    //         "scenario": null,
    //         "selected_variant": "evening",
    //         "selected_model": "home",
    //         "channel": "googlehome",
    //         "createdByMe": true
    //     }
    // ]
});
```
### getConversations('CONVERSATION-ID')
You can get the conversation ID by visiting the building mode page, the conversation ID is in the right side.
```js
botsociety.getConversations('CONVERSATION-ID').then(response => {
  console.log(response)
    //  Example response for a Messenger conversation.
    // {
    //     "_id":"5a72e561f34eeb072c293cfd",
    //     "updatedAt":"2018-02-01T10:01:30.137Z",
    //     "createdAt":"2018-02-01T10:01:05.751Z",
    //     "name":"Test Mockup mockup",
    //     "menu": {
    //        "nodes": [
    //            {
    //                "messages": [],
    //                "nodes": [
    //                    {
    //                        "messages": [],
    //                        "nodes": [],
    //                        "title": "Contact us",
    //                        "id": "1a22984b-6b88-2253-9685-ab1521c4548e"
    //                    }
    //                ],
    //                "title": "Help",
    //                "id": "0942ff9f-840d-619d-df0f-7afd5fe99025"
    //            }
    //        ]
    //     },
    //     "set_welcome":false,
    //     "ws_page_category":"2301",
    //     "ws_fans":"0",
    //     "ws_text":"Hi, click the button below to start!",
    //     "rtl":false,
    //     "selected_variant":"white",
    //     "selected_model":"iphone6",
    //     "channel":"facebook",
    //     "messages":[
    //         {
    //             "_id":"5a72e57af34eeb072c293cff",
    //             "updatedAt":"2018-02-01T10:11:36.571Z",
    //             "createdAt":"2018-02-01T10:01:30.048Z",
    //             "type":"text",
    //             "custom_label": null,
    //             "is_left_side": true,    
    //             "text":"I'm a bot",
    //             "_conversation":"5a72e561f34eeb072c293cfd",
    //             "next_alternative":null,
    //             "prev_alternative":null,
    //             "attachments":[
    //                 {
    //                     "choices":[],
    //                     "labels":[],
    //                     "size":"horizontal"
    //                 }
    //             ],
    //             "next_message":"5a72e7d8f34eeb072c293d00",
    //             "is_next_message_linked":false,
    //             "prev_linked_messages":[],
    //             "prev_message":null,
    //             "show_time":1500,
    //             "alternativeChoices":[],
    //             "choices":[],
    //             "text_with_variables": "I'm a ${whoami}",
    //             "progressiveId": 1,
    //             "intent": "default-intent-0"
    //         },
    //         {
    //             "_id":"5a72e7d8f34eeb072c293d00",
    //             "updatedAt":"2018-02-01T10:11:36.560Z",
    //             "createdAt":"2018-02-01T10:11:36.560Z",
    //             "type":"text",
    //             "custom_label": null,
    //             "is_left_side": true,      
    //             "text":"I'm a user",
    //             "_conversation":"5a72e561f34eeb072c293cfd",
    //             "next_alternative":null,
    //             "prev_alternative":null,
    //             "attachments":[
    //                 {
    //                     "choices":[],
    //                     "labels":[],
    //                     "size":"horizontal"
    //                 }
    //             ],
    //             "next_message":null,
    //             "is_next_message_linked":false,
    //             "prev_linked_messages":[],
    //             "prev_message":"5a72e57af34eeb072c293cff",
    //             "show_time":1500,
    //             "alternativeChoices":[],
    //             "choices":[],
    //             "text_with_variables": "I'm a ${whoami}",
    //             "progressiveId": 2,
    //             "intent": "custom-intent"
    //         }
    //     ]
    // }
});
```
### getMessageByConversation('CONVERSATION-ID','MESSAGE-ID')
You can use the unique id or the progressive id.
You can get the progressive ID by visiting the building mode page (Build button), progressive ID is referenced as "ID".
```js
botsociety.getMessageByConversation('CONVERSATION-ID','MESSAGE-ID').then(response => {
  console.log(response)
    //  Example response for message id
    // {
    //     "_id": "59b6ada2b674680d16cd7d79",
    //     "updatedAt": "2017-09-11T15:37:06.775Z",
    //     "createdAt": "2017-09-11T15:37:06.775Z",
    //     "type": "text",
    //     "custom_label": null,
    //     "is_left_side": false,
    //     "text": "Hello Stefano, how are you today?",
    //     "text_with_variables": "Hello ${Name}, how are you today?",
    //     "_conversation": "59b6abdcb674680d16cd7d74",
    //     "next_alternative": null,
    //     "prev_alternative": null,
    //     "attachments": [
    //         {
    //             "choices": [],
    //             "labels": []
    //         }
    //     ],
    //     "next_message": null,
    //     "is_next_message_linked": false,
    //     "prev_linked_messages": [],
    //     "prev_message": "59b6ad99b674680d16cd7d78",
    //     "show_time": 1500,
    //     "alternativeChoices": [],
    //     "choices": [],
    //     "progressiveId": 1,
    //      "intent": "default-intent-0"
    // }
});
```
### getConversationVariables('CONVERSATION-ID')
```js
botsociety.getConversationVariables('CONVERSATION-ID').then(response => {
  console.log(response)
    //  Example response for variables
    //  {
    //      "Name": {
    //          "values": [
    //              "Stefano",
    //              "Max"
    //          ]
    //      }
    //  }
});
```
### getMessage('MESSAGE-ID')
```js
botsociety.getMessage('MESSAGE-ID').then(response => {
  console.log(response)
    //  Example response for message id
    //   {
    //     "_id": "5a3a974b0462ee0d00c626a5",
    //     "updatedAt": "2017-12-20T17:01:13.896Z",
    //     "createdAt": "2017-12-20T17:00:59.160Z",
    //     "type": "tbuttons",
    //     "is_left_side": true,
    //     "custom_label": null,
    //     "text": "",
    //     "_conversation": "5a3a941a0462ee0d00c62694",
    //     "next_alternative": null,
    //     "prev_alternative": null,
    //     "attachments": [{
    //         "image": "https://s3.amazonaws.com/botsociety.prod.us/18e96cca4953df72693feb59_screen%20shot%2020171215%20at%20114303%20pmpng.png",
    //         "labels": ["Civ 6", "$300 now"],
    //         "choices": [{
    //             "next_message": null,
    //             "is_next_message_linked": false,
    //             "text": "Buy"
    //         }, {
    //             "next_message": null,
    //             "is_next_message_linked": false,
    //             "text": "Rent"
    //         }]
    //     }],
    //     "next_message": null,
    //     "is_next_message_linked": false,
    //     "prev_linked_messages": [],
    //     "prev_message": "5a3a97570462ee0d00c626a8",
    //     "show_time": 1500,
    //     "alternativeChoices": [],
    //     "choices": [],
    //     "progressiveId": 1,
    //     "intent": "default-intent-0"
    //   }
});
```

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