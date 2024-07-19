import type { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'

export interface IRequestConfig<T = any> extends AxiosRequestConfig {
  interceptors?: {
    requestSuccessFun?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
    requestFailFun?: (err: any) => any
    responseSuccessFun?: (res: T) => T
    responseFailFun?: (err: any) => any
  }
}
type CodeType = 0
export interface IResponse<T = any> {
  config: AxiosRequestConfig
  data: {
    code: CodeType
    data: T
  }
}
