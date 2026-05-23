import React from 'react'
import { Redirect, Stack } from 'expo-router'
import { useAuthStore } from '@/stores/useAuthStore'

const AuthLayout = () => {
    const { isLoggIn } = useAuthStore();

    if (isLoggIn) {
        return <Redirect href="/" />;
    }

    return (
        <Stack>
            <Stack.Screen name="register" options={{ headerShown: false }} />
            <Stack.Screen name="login" options={{ headerShown: false }} />
        </Stack>
    )
}

export default AuthLayout