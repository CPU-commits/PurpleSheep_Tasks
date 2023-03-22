import axios, { type AxiosError, type AxiosRequestConfig } from "axios"

import type { HTTPMethods } from "$models/HTTP/methods.model"
import type { FetchResponse } from "$models/HTTP/fetchDataResponse.model"

import { spinner } from '$stores/stores'

export interface ErrorFetchResponse {
    success: boolean
    statusCode: number
    message: string
}

class APIModule {
    private handleUnexpectedError(error: Error){
        return {
            success: false,
            message: error.message,
            statusCode: 500,
        }
    }

    private async handleAxiosError(error: AxiosError){
        const responseJSON = error.response?.data as any
        if(error.response){
            return {
                success: false,
                statusCode: error.response.status,
                message: responseJSON
                    ? responseJSON.message
                    : error.message,
            }
        }else{
            return {
                success: false,
                message: responseJSON?.message
                    ? responseJSON?.message
                    : error.request.statusText,
                request: error.request,
                statusCode: 500,
            }
        }
    }

    async fetchData(
        method: keyof typeof HTTPMethods,
        URL: string,
        body = undefined,
        spinnerStatus = true,
        config: AxiosRequestConfig = {
            headers: {
                'content-type': 'application/json',
            },
        }
    ): Promise<FetchResponse> {
        spinner.set(spinnerStatus)
        const response = await axios[method](URL, body, config)
            .then((res) =>{
                return res.data
            })
            .catch(async (error: Error | AxiosError) =>{
                spinner.set(false)
                if(axios.isAxiosError(error)){
                    return await this.handleAxiosError(error)
                }else{
                    return this.handleUnexpectedError(error)
                }
            })
        spinner.set(false)
        if(!response.success)
            throw response
        return response
    }

    async fetchDeleteData(
        URL: string,
        spinnerStatus = true,
        config: AxiosRequestConfig = {
            headers: {
                'content-type': 'application/json',
            },
        },
    ): Promise<FetchResponse> {
        spinner.set(spinnerStatus)
        const response = await axios.delete(URL, config)
            .then((res) =>{
                return res.data
            })
            .catch(async (error: Error | AxiosError)=>{
                spinner.set(false)
                if(axios.isAxiosError(error)){
                    return await this.handleAxiosError(error)
                }else{
                    return this.handleUnexpectedError(error)
                }
            })
        spinner.set(false)
        if(!response.success && config.responseType !== 'arraybuffer')
            throw response
        return response
    }

    async fetchGetData(
        URL: string,
        spinnerStatus = false,
        config: AxiosRequestConfig = {
            headers: {
                'content-type': 'application/json',
            },
        },
    ): Promise<FetchResponse> {
        spinner.set(spinnerStatus)
        const response = await axios.get(URL, config)
            .then((res) =>{
                return res.data
            })
            .catch(async (error: Error | AxiosError)=>{
                spinner.set(false)
                if(axios.isAxiosError(error)){
                    return await this.handleAxiosError(error)
                }else{
                    return this.handleUnexpectedError(error)
                }
            })
        spinner.set(false)
        if(!response.success && config.responseType !== 'arraybuffer')
            throw response
        return response
    }
}

const API = new APIModule()

export default API
