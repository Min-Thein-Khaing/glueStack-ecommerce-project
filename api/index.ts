import { useAuthStore } from "@/stores/useAuthStore"
import axios, { create } from "axios"

export const baseUrl = process.env.EXPO_PUBLIC_BASE_URL

export const authApi = create({
    baseURL: baseUrl,
    headers: {
        "Content-Type": "application/json"
    }
    // withCredentials:true    that is for web development 
})

export const api = create({
    baseURL: baseUrl,
    headers: {
        "Content-Type": "application/json"
    }
})


let isRefreshing = false
let failedRequestQueue: {
    resolve: () => void,
    reject: (error: unknown) => void
}[] = []

api.interceptors.request.use((config) => {
    const { accessToken } = useAuthStore.getState()
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
})
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config//ပျက်စီးသွားတဲ့ မူလ Request ခဏ မှတ်ထားလိုက်တာပါ။ (ဥပမာ- /profile ခေါ်တာ)
        const status = error.response?.status
        if (status === 401 && !originalRequest._retry) {
            /* multiple request manage */
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedRequestQueue.push({
                        resolve: () => resolve(api(originalRequest)),
                        reject: (error) => reject(error)
                    })
                })
            }
            /* that is single request manage */
            isRefreshing = true
            originalRequest._retry = true
            const { refreshToken, accessToken, randomToken, setAccessToken, signOut } = useAuthStore.getState()

            try {
                const res = await axios.post(`${process.env.EXPO_PUBLIC_BASE_URL}/refresh-token`,
                    {
                        refreshToken: refreshToken,
                        randToken: randomToken,
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${accessToken}`,
                        }
                    }
                )
                
                setAccessToken({ accessToken: res.data.token, refreshToken: res.data.refreshToken, randomToken: res.data.randToken })

                originalRequest.headers.Authorization = `Bearer ${res.data.token}`

                failedRequestQueue.forEach(request => request.resolve())
                failedRequestQueue = []

                return api(originalRequest)

            } catch (error) {
                signOut()
                failedRequestQueue.forEach(request => request.reject(error))
                failedRequestQueue = []
                return Promise.reject(error)
            } finally {
                isRefreshing = false
            }
        }
        
        return Promise.reject(error)
    }
)