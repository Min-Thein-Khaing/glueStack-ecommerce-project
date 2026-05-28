import { authApi } from "@/api"
import axios from "axios";


export const loginPost = async (data: { phone: string, password: string }) => {
    try {
        const res = await authApi.post("login", data)
        return res.data
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data?.message || "Something went wrong"
        } else {
            throw error;
        }
    }
}

export const registerPost = async (data: { phone: string }) => {
    try {
        const res = await authApi.post("register", data)
        return res.data
    } catch (error: any) {
        throw error;
    }
}

export const verifyOTPPost = async (data: { phone: string, otp: string, token: string }) => {
    try {
        const res = await authApi.post("verify-otp", data)
        return res.data
    } catch (error: any) {
        throw error;
    }
}

export const passwordConfirm = async (data: { phone: string, password: string, token: string }) => {
    try {
        const res = await authApi.post("confirm-password", data)
        return res.data
    } catch (error: any) {
        throw error;
    }
}