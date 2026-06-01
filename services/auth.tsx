import { authApi } from "@/api"
import axios from "axios";


export const loginPost = async (data: { phone: string, password: string }) => {
    try {
        const res = await authApi.post("login", data)
        return res.data
    } catch (error: any) {
        if (error?.response?.status === 401) {
            throw new Error('Invalid phone or password')
        }
        if (error?.code === 'ERR_NETWORK' || !error?.response) {
            throw new Error('Network error. Check your connection.')
        }
        throw new Error(error?.response?.data?.message || error?.message || 'Login failed')
    }
}

export const registerPost = async (data: { phone: string }) => {
    try {
        const res = await authApi.post("register", data)
        return res.data
    } catch (error: any) {
        if (error?.code === 'ERR_NETWORK' || !error?.response) {
            throw new Error('Network error. Check your connection.')
        }
        throw new Error(error?.response?.data?.message || error?.message || 'Registration failed')
    }
}

export const verifyOTPPost = async (data: { phone: string, otp: string, token: string }) => {
    try {
        const res = await authApi.post("verify-otp", data)
        return res.data
    } catch (error: any) {
        if (error?.code === 'ERR_NETWORK' || !error?.response) {
            throw new Error('Network error. Check your connection.')
        }
        throw new Error(error?.response?.data?.message || error?.message || 'OTP verification failed')
    }
}

export const passwordConfirm = async (data: { phone: string, password: string, token: string }) => {
    try {
        const res = await authApi.post("confirm-password", data)
        return res.data
    } catch (error: any) {
        if (error?.code === 'ERR_NETWORK' || !error?.response) {
            throw new Error('Network error. Check your connection.')
        }
        throw new Error(error?.response?.data?.message || error?.message || 'Password confirmation failed')
    }
}