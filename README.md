# Botsociety API
[![NPM](https://nodei.co/npm/botsociety.png)](https://nodei.co/npm/botsociety/)

Npm module to retrieve automagically the content of your chatbot designs from botsociety.io

You can find more details about our API at https://botsociety.docs.apiary.io

## What you can do
- [`testing API auth`](https://botsociety.docs.apiary.io/#reference/0/auth/auth)
- [`retrieve all conversations`](https://botsociety.docs.apiary.io/#reference/0/list-conversations)
- [`retrieve single conversation`](https://botsociety.docs.apiary.io/#reference/0/get-conversation)
- [`retrieve all messages for a specific conversation`](https://botsociety.docs.apiary.io/#reference/0/get-message)
- [`retrieve all variables for a specific conversation`](https://botsociety.docs.apiary.io/#reference/0/get-variables/get-variables)

## Methods
- auth()
- getConversations()
- getConversations(conversationId)
- getMessage(messageId)
- getVariables(conversationId)

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
  debug : false,
  apiVersion : '1.1' // or 1.0
}

let botsociety = new Botsociety(config)

botsociety.auth().then(response => {
  console.log(response)
  //Example response object:
  //  {
  //    "auth": true,
  //    "info": "You are successfully calling the API. This is just a test API to check your authentication params."
  //  }
});

botsociety.getConversations().then(response => {
 console.log(response)
    // Example response from a user with 5 different mockups
    // [
    //   {
    //     "_id": "5a172074bdef0da90e0133a1",
    //     "updatedAt": "2017-12-06T15:53:46.011Z",
    //     "createdAt": "2017-11-23T19:24:36.142Z",
    //     "name": "My first mockup",
    //     "__v": 1,
    //     "previewSpeed": 1,
    //     "selected_variant": "evening",
    //     "selected_model": "echo",
    //     "channel": "amazonecho"
    //   },
    //   {
    //     "_id": "5a328c683dac25ae4ad593fb",
    //     "updatedAt": "2017-12-14T17:04:53.616Z",
    //     "createdAt": "2017-12-14T14:36:24.519Z",
    //     "name": "My second mockup",
    //     "__v": 1,
    //     "previewSpeed": 1,
    //     "selected_variant": "white",
    //     "selected_model": "iphone6",
    //     "channel": "facebook"
    //   },
    //   {
    //     "_id": "5a37ea5dcd6c7b37328a772e",
    //     "updatedAt": "2017-12-18T17:08:36.495Z",
    //     "createdAt": "2017-12-18T16:18:37.316Z",
    //     "name": "A slack bot mockup",
    //     "__v": 1,
    //     "previewSpeed": 1,
    //     "selected_variant": "black",
    //     "selected_model": "pixel2",
    //     "channel": "slack"
    //   },
    //   {
    //     "_id": "5a37f9893218e61e364540d4",
    //     "updatedAt": "2017-12-18T17:23:52.420Z",
    //     "createdAt": "2017-12-18T17:23:21.630Z",
    //     "name": "Ex test mockup copy",
    //     "__v": 0,
    //     "previewSpeed": 1,
    //     "selected_variant": "black",
    //     "selected_model": "iphone6",
    //     "channel": "facebook-extension"
    //   }
    // ]
});

botsociety.getConversations('CONVERSATION-ID').then(response => {
  console.log(response)
    //  Example response for a Messenger conversation.
    //  You can see this conversation here: https://app.botsociety.io/s/5a3a941a0462ee0d00c62694?p=ae70e850f80838592dbe655eb06e3f9b5c63c627
    //   {
    //     "_id": "5a3a941a0462ee0d00c62694",
    //     "updatedAt": "2017-12-20T17:01:14.067Z",
    //     "createdAt": "2017-12-20T16:47:22.059Z",
    //     "name": "PizzaMBot mockup",
    //     "__v": 1,
    //     "global_views_count": 0,
    //     "unique_views_count": 0,
    //     "options": {
    //         "menu": [{
    //             "id": "1fc8b7c3-a234-8ce1-ebf9-877a6bda72ee",
    //             "title": "Help",
    //             "nodes": [{
    //                 "id": "6e70025a-bdcd-4801-5611-5793f9c3e5dd",
    //                 "title": "Contact us",
    //                 "nodes": [],
    //                 "messages": []
    //             }],
    //             "messages": []
    //         }]
    //     },
    //     "previewSpeed": 1,
    //     "set_welcome": false,
    //     "ws_page_category": "2301",
    //     "ws_fans": "0",
    //     "ws_text": "Hi, click the button below to start!",
    //     "rtl": false,
    //     "selected_variant": "white",
    //     "selected_model": "iphone6",
    //     "channel": "facebook",
    //     "messages": [{
    //         "_id": "5a3a974b0462ee0d00c626a5",
    //         "updatedAt": "2017-12-20T17:01:13.896Z",
    //         "createdAt": "2017-12-20T17:00:59.160Z",
    //         "type": "tbuttons",
    //         "side": true,
    //         "text": "",
    //         "_sender": "5a3a941a0462ee0d00c62693",
    //         "_conversation": "5a3a941a0462ee0d00c62694",
    //         "__v": 2,
    //         "global_views_count": 0,
    //         "unique_views_count": 0,
    //         "next_alternative": null,
    //         "prev_alternative": null,
    //         "attachments": [{
    //             "image": "https://s3.amazonaws.com/botsociety.prod.us/18e96cca4953df72693feb59_screen%20shot%2020171215%20at%20114303%20pmpng.png",
    //             "labels": ["Civ 6", "$300 now"],
    //             "choices": [{
    //                 "next_message": null,
    //                 "is_next_message_linked": false,
    //                 "text": "Buy"
    //             }, {
    //                 "next_message": null,
    //                 "is_next_message_linked": false,
    //                 "text": "Rent"
    //             }]
    //         }],
    //         "next_message": null,
    //         "is_next_message_linked": false,
    //         "prev_linked_messages": [],
    //         "prev_message": "5a3a97570462ee0d00c626a8",
    //         "show_time": 1500,
    //         "alternativeChoices": [],
    //         "choices": []
    //     }, {
    //         "_id": "5a3a97550462ee0d00c626a7",
    //         "updatedAt": "2017-12-20T17:01:13.893Z",
    //         "createdAt": "2017-12-20T17:01:09.294Z",
    //         "type": "text",
    //         "side": true,
    //         "text": "hi there",
    //         "_sender": "5a3a941a0462ee0d00c62693",
    //         "_conversation": "5a3a941a0462ee0d00c62694",
    //         "__v": 0,
    //         "global_views_count": 0,
    //         "unique_views_count": 0,
    //         "next_alternative": null,
    //         "prev_alternative": null,
    //         "attachments": [{
    //             "choices": [],
    //             "labels": []
    //         }],
    //         "next_message": "5a3a97570462ee0d00c626a8",
    //         "is_next_message_linked": false,
    //         "prev_linked_messages": [],
    //         "prev_message": null,
    //         "show_time": 1500,
    //         "alternativeChoices": [],
    //         "choices": []
    //     }, {
    //         "_id": "5a3a97570462ee0d00c626a8",
    //         "updatedAt": "2017-12-20T17:01:13.894Z",
    //         "createdAt": "2017-12-20T17:01:11.515Z",
    //         "type": "text",
    //         "side": false,
    //         "text": "hi",
    //         "_sender": "5a3a941c0462ee0d00c62695",
    //         "_conversation": "5a3a941a0462ee0d00c62694",
    //         "__v": 0,
    //         "global_views_count": 0,
    //         "unique_views_count": 0,
    //         "next_alternative": null,
    //         "prev_alternative": null,
    //         "attachments": [{
    //             "choices": [],
    //             "labels": []
    //         }],
    //         "next_message": "5a3a974b0462ee0d00c626a5",
    //         "is_next_message_linked": false,
    //         "prev_linked_messages": [],
    //         "prev_message": "5a3a97550462ee0d00c626a7",
    //         "show_time": 1500,
    //         "alternativeChoices": [],
    //         "choices": []
    //     }]
    //   }
});

botsociety.getMessage('MESSAGE-ID').then(response => {
  console.log(response)
    //  Example response for message id
    //   {
    //     "_id": "5a3a974b0462ee0d00c626a5",
    //     "updatedAt": "2017-12-20T17:01:13.896Z",
    //     "createdAt": "2017-12-20T17:00:59.160Z",
    //     "type": "tbuttons",
    //     "side": true,
    //     "text": "",
    //     "_sender": "5a3a941a0462ee0d00c62693",
    //     "_conversation": "5a3a941a0462ee0d00c62694",
    //     "__v": 2,
    //     "global_views_count": 0,
    //     "unique_views_count": 0,
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
    //     "choices": []
    //   }
});

botsociety.getMessageByConversation('CONVERSATION-ID','MESSAGE-ID').then(response => {
  console.log(response)
    //  Example response for message id
    //   {
    //     "_id": "5a3a974b0462ee0d00c626a5",
    //     "updatedAt": "2017-12-20T17:01:13.896Z",
    //     "createdAt": "2017-12-20T17:00:59.160Z",
    //     "type": "tbuttons",
    //     "side": true,
    //     "text": "",
    //     "_sender": "5a3a941a0462ee0d00c62693",
    //     "_conversation": "5a3a941a0462ee0d00c62694",
    //     "__v": 2,
    //     "global_views_count": 0,
    //     "unique_views_count": 0,
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
    //     "choices": []
    //   }
});

botsociety.getVariables('CONVERSATION-ID').then(response => {
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

