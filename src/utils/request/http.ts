import API from './index'
import type { IResponse } from './type'
import { getToken } from '../db/user'
export const request = new API({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 30000,
  interceptors: {
    requestSuccessFun: (config) => {
      const token = getToken()
      if (token && config.headers) {
        config.headers['Authorization'] = token
      }
      return config
    },
    responseSuccessFun: (res) => {
      if (res.status === 200) {
        return handleResponse(res)
      }
    }
  }
})

function handleResponse(res: IResponse) {
  let _code: never
  switch (res.data.code) {
    case 0:
      return res.data.data
    default:
      _code = res.data.code
      console.log(_code)
      break
  }
}
