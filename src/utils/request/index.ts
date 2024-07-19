import axios from 'axios'
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import type { IRequestConfig } from './type'
class API {
  instance: AxiosInstance
  constructor(config: IRequestConfig) {
    this.instance = axios.create(config)
    // 添加类内部统一的拦截器
    this.instance.interceptors.request.use((config) => {
      return config
    })
    this.instance.interceptors.response.use((response) => {
      return response
    })

    // 添加全局的拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessFun,
      config.interceptors?.requestFailFun
    )
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFun,
      config.interceptors?.responseFailFun
    )
  }

  async request<T>(config: IRequestConfig<T>) {
    // 添加单个函数的拦截器
    if (config.interceptors?.requestSuccessFun) {
      config = config.interceptors.requestSuccessFun(config as InternalAxiosRequestConfig)
    }
    // 指定返回值的类型 Promise可以传入一个泛型,用来指定resolve返回的类型
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseSuccessFun) {
            res = config.interceptors.responseSuccessFun(res)
          }
          resolve(res)
        })
        .catch((err) => {
          if (config.interceptors?.responseFailFun) {
            err = config.interceptors.responseFailFun(err)
          }
          reject(err)
        })
    })
  }
  get<T = any>(config: IRequestConfig<T>) {
    return this.request({ ...config, method: 'GET' })
  }
  post<T = any>(config: IRequestConfig<T>) {
    return this.request({ ...config, method: 'POST' })
  }
  delete<T = any>(config: IRequestConfig<T>) {
    return this.request({ ...config, method: 'DELETE' })
  }
  patch<T = any>(config: IRequestConfig<T>) {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default API
