const assert = require('assert')

const { getVariablesInfo } = require('./index')

describe('variable.utilities', () => {
  describe('getVariablesInfo()', () => {
    it('should format variables with vartypes', () => {
      const variables = [
        {
          _id: 'var-id-1',
          vartypes: { Dialogflow: 'vartype-id-1' },
          values: ['large'],
          defaultVartypes: {
            Custom: 'generic',
            OracleBot: 'generic',
            IBMWatson: 'generic',
            MicrosoftBotFramework: 'generic',
            Rasa: 'rasa_core.slots.TextSlot',
          },
          name: 'pizza size',
        },
        {
          _id: 'var-id-2',
          values: ['San Francisco'],
          defaultVartypes: {
            Custom: 'generic',
            OracleBot: 'generic',
            IBMWatson: 'generic',
            MicrosoftBotFramework: 'generic',
            Rasa: 'rasa_core.slots.TextSlot',
            Dialogflow: '@sys.geo-city',
          },
          name: 'address',
        },
      ]
      const vartypes = [
        { _id: 'vartype-id-1', name: 'pizza-size' },
        { _id: 'vartype-id-2', name: 'pizza-type' },
      ]
      const expected = [
        {
          _id: 'var-id-1',
          name: 'pizza size',
          values: ['large'],
          vartypes: {
            Custom: 'generic',
            OracleBot: 'generic',
            IBMWatson: 'generic',
            MicrosoftBotFramework: 'generic',
            Rasa: 'rasa_core.slots.TextSlot',
            Dialogflow: 'pizza-size',
          },
        },
        {
          _id: 'var-id-2',
          values: ['San Francisco'],
          vartypes: {
            Custom: 'generic',
            OracleBot: 'generic',
            IBMWatson: 'generic',
            MicrosoftBotFramework: 'generic',
            Rasa: 'rasa_core.slots.TextSlot',
            Dialogflow: '@sys.geo-city',
          },
          name: 'address',
        },
      ]

      const actual = getVariablesInfo(variables, vartypes)

      assert.deepStrictEqual(actual, expected)
    })
  })
})
