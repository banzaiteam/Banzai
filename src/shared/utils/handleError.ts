import {
  BaseQueryApi,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  QueryReturnValue,
} from '@reduxjs/toolkit/query/react'
import { isErrorWithMessage } from './isErrorWithMessage'
import { setAppError } from '@shared/store/slices/appSlice'

export const handleError = (
  api: BaseQueryApi,
  result: QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>
) => {
  let appError = 'Some error occurred'

  if (result.error) {
    switch (result.error.status) {
      case 'FETCH_ERROR':
      case 'PARSING_ERROR':
      case 'CUSTOM_ERROR':
        appError = result.error.error
        break

      case 403: {
        appError = '403 Forbidden Error. Check API-KEY'
        break
      }

      case 409: {
        appError = '409 This email or username already exists in the system'
        break
      }

      case 400:
      case 401:
      case 500: {
        if (isErrorWithMessage(result.error.data)) {
          appError = result.error.data.message
        } else {
          appError = JSON.stringify(result.error.data)
        }
        break
      }

      default:
        appError = JSON.stringify(result.error)
        break
    }
    api.dispatch(setAppError({ appError }))
  }
};

  /*switch ((result.data as { resultCode: ResultCodeStatus }).resultCode) {
    case ResultCodeStatus.fail: {
      const messages = (result.data as { messages: string[] }).messages;
      appError = messages.length ? messages[0] : appError;
      api.dispatch(setAppError({ appError }));
      break;
    }
    case ResultCodeStatus.captcha: {
      api.dispatch(setAppError({ error: `neeed captcha` }));
      break;
    }
    default: {
    }
  }*/

  ///можно писать as если мы точно уверенны, (документация или разговор с беком)
