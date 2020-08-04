var http = require('https')
module.exports = Utilities;
function Utilities(config) {
  this.config = config
  var self = this;
  var parameter = ""
  this.getConversation = (conversationId, deviceToExport) => {
    httpOptions = {
      hostname: `${this.config.domain}`,
      port: 443,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'user_id': `${this.config.userId}`,
        'api_key_public': `${this.config.apiKey}`,
      },
      path: `/designs/${conversationId}/integrations${parameter}`
    }
    var promise = new Promise(function(done, error) {
      var responseData = ""
      const req = http.get(httpOptions, (res) => {
        // console.log(`STATUS: ${res.statusCode}`);
        // console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          responseData += chunk
        });
        res.on('end', () => {
          done(JSON.parse(responseData))
        });
      });
      req.on('error', (e) => {
        error(e)
      });
      req.end();
    })
    return promise;
  }
}