import * as AppUtils from './AppUtils'
import {BASE_URL} from './baseURL'
import {getCookie, setCookie} from './AppUtils'

// for new server testing
// var baseURL = 'https://eb39mvju09.execute-api.ap-southeast-1.amazonaws.com/alpha/api?url='
export function setBaseURL (url) {
  setCookie('baseURL', url, 30)
}

export function getBaseURL () {
  let url = getCookie('baseURL')
  if (url == '' || url == undefined) {
    return BASE_URL
  } else {
    return url
  }
}
