import Axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig,CancelTokenSource } from 'axios'
import qs from 'qs'

class Request {
    instance: AxiosInstance

    constructor(config: AxiosRequestConfig) {
        this.instance = Axios.create(config)
        
        // 拦截器初始化
        this.interceptorsRequest()
        this.interceptorsResponse()
    }
    request(config: AxiosRequestConfig) {
        return this.instance.request(config)
    }

    // 请求拦截器
    private interceptorsRequest() {
        // 注册请求拦截器
        this.instance.interceptors.request.use(
            (res: AxiosRequestConfig) => {
                return res
            },
            (err: any) => err,
        )
    }

    // 响应拦截器
    private interceptorsResponse() {
        this.instance.interceptors.response.use(
            (res: AxiosRequestConfig) => {
                return res.data
            },
            (err: any) => err,
        )
    }

    public get(url: string, params?:any):Promise<any> {
        const serverConfig: AxiosRequestConfig = {
            url,
            method: "get",
            params
        };
        return this.instance(url, serverConfig);
    }

    public post(url: string, params?:any) {
        const serverConfig: AxiosRequestConfig = {
            url,
            method: "post",
            data: params,
        };
        return this.instance(url, serverConfig);
    }


}
const baseURL = 'https://www.fastmock.site/mock/8425537a3d9cb3c4cc257ba75197cc50/api'
const timeout = 10 * 1000


export default new Request({baseURL,timeout})