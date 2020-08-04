const {
  pipe,
  props,
  flatten,
  values,
  find,
  all,
  isEmpty,
  propEq,
  defaultTo,
  prop,
  cond,
  equals,
  append,
  evolve,
  reduce,
  T: rT,
} = require('ramda/src')
const { notNil, assocValueIf } = require('../js.utilities')

exports.getMessageTextsFromMessageInfo = (messageInfo) => pipe(props(['ssmlPlainTexts', 'textComponents']), flatten)(messageInfo)

exports.getPathIdByIntentId = (intentId, pathsByKey) => pipe(values, find(propEq('_intent', intentId)), defaultTo({}), prop('_id'))(pathsByKey)

//
// Error utilities
//

// Format for responses

// const ExportType = {
//   DownloadZip: 'download-zip',
//   Api: 'api',
// }

// const IntegrationResultStatus = {
//   Success: 'ok',
//   Error: 'error',
// }

// const ResponseBuildMessageInfoBase = {
//   info: 'string',
//   status: ResponseBuildMessagesInfoStatus,
// }

// const ResponseBuildMessageInfo =
//   {
//     id: '',
//     type: ResponseBuildMessagesInfoType.Message,
//   } & ResponseBuildMessageInfoBase

// const ResponseBuildPathInfo =
//   {
//     type: ResponseBuildMessagesInfoType.Path,
//   } & ResponseBuildMessageInfoBase

// const ResponseBuildGenericInfo =
//   {
//     type: ResponseBuildMessagesInfoType.Generic,
//   } & ResponseBuildMessageInfoBase

// const ResponseBuildInfo = {
//   zipUrl: 'string',
//   fileName: 'string',
//   info: 'string',
//   genericInfo: [], // Array<ResponseBuildGenericInfo>,
//   messagesInfo: [], // Array<ResponseBuildMessageInfo>,
//   pathsInfo: [], // Array<ResponseBuildPathInfo>,
// }
// const ResponseBuildResponse = {
//   status: IntegrationResultStatus,
//   type: ExportType,
//   info: ResponseBuildInfo,
// }

const ResponseBuildMessagesInfoStatus = (exports.ResponseBuildMessagesInfoStatus = {
  Info: 'info',
  Warning: 'warning',
  Error: 'error',
})

const ResponseBuildMessagesInfoType = (exports.ResponseBuildMessagesInfoType = {
  Generic: 'generic',
  Message: 'message',
  Path: 'path',
})

const formatGenericInfoMessage = (exports.formatGenericInfoMessage = (errorMessage, status = ResponseBuildMessagesInfoStatus.Error) => ({
  type: ResponseBuildMessagesInfoType.Generic,
  info: errorMessage,
  status: status,
}))

const formatInfoMessageOnMessage = (exports.formatInfoMessageOnMessage = (
  errorMessage,
  messageId,
  status = ResponseBuildMessagesInfoStatus.Error
) => ({
  type: ResponseBuildMessagesInfoType.Message,
  info: errorMessage,
  status: status,
  id: messageId,
}))

const formatInfoMessageOnPath = (exports.formatInfoMessageOnPath = (errorMessage, pathId, status = ResponseBuildMessagesInfoStatus.Error) => ({
  type: ResponseBuildMessagesInfoType.Path,
  info: errorMessage,
  status: status,
  id: pathId,
}))

/**
 * options can contain one of these combinations:
 *  for message errors:
 *    - messageId
 *
 *  for path errors:
 *    - pathId
 *
 *  for generic errors: leave it empty
 */
const formatInfoMessage = (exports.formatInfoMessage = (errorMessage, status = ResponseBuildMessagesInfoStatus.Error, options = {}) => {
  const messageIdOrNull = prop('messageId', options)
  const pathIdOrNull = prop('pathId', options)
  return cond([
    [() => notNil(messageIdOrNull), () => formatInfoMessageOnMessage(errorMessage, messageIdOrNull, status)],
    [() => notNil(pathIdOrNull), () => formatInfoMessageOnPath(errorMessage, pathIdOrNull, status)],
    [rT, () => formatGenericInfoMessage(errorMessage, status)],
  ])({})
})

const isInfoOfType = (type1) => (infoMessage) => pipe(prop('type'), defaultTo(ResponseBuildMessagesInfoType.Generic), equals(type1))(infoMessage)

const formatResponseInfo = (exports.formatResponseInfo = (infoMessages, stringMessage = '') =>
  pipe(
    reduce(
      (errorsAcc, infoMessage) =>
        cond([
          [isInfoOfType(ResponseBuildMessagesInfoType.Message), () => evolve({ messagesInfo: append(infoMessage) }, errorsAcc)],
          [isInfoOfType(ResponseBuildMessagesInfoType.Path), () => evolve({ pathsInfo: append(infoMessage) }, errorsAcc)],
          [rT, () => evolve({ genericInfo: append(infoMessage) }, errorsAcc)],
        ])(infoMessage),
      {
        genericInfo: [],
        messagesInfo: [],
        pathsInfo: [],
      }
    ),
    (obj) => assocValueIf(notNil, 'info', obj, stringMessage)
  )(infoMessages))

exports.formatSplittedResponseInfo = (infoMsg, genericInfoMessages, infoOnMessages, infoOnPaths) => ({
  info: infoMsg || '',
  genericInfo: genericInfoMessages || [],
  messagesInfo: infoOnMessages || [],
  pathsInfo: infoOnPaths || [],
})

exports.emptyFormattedResponseInfo = {
  info: '',
  genericInfo: [],
  messagesInfo: [],
  pathsInfo: [],
}

exports.formattedResponseErrorsEmpty = (formattedResponse) =>
  all(isEmpty, [prop('genericInfo', formattedResponse), prop('messagesInfo', formattedResponse), prop('pathsInfo', formattedResponse)])

exports.formatMessageAndResponse = (errorMessage, responseMessage = '', status = ResponseBuildMessagesInfoStatus.Error, options = {}) => {
  const infoMsg = formatInfoMessage(errorMessage, status, options)
  return formatResponseInfo([infoMsg], responseMessage)
}

exports.formatResponse = (statusCode, responseInfo) => ({
  statusCode: statusCode,
  info: responseInfo,
})

exports.IntegrationResultStatus = {
  Success: {
    statusCode: 200,
    message: 'Exported successfully',
  },
  Error: {
    statusCode: 500,
    message: 'Error during the export',
  },
}
