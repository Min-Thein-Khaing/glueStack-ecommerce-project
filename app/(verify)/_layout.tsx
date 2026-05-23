import React from 'react'
import { Redirect, Stack } from 'expo-router'
import { useAuthStore } from '@/stores/useAuthStore'

const VerifyLayout = () => {
    const {isOtpScreen} = useAuthStore();
    

    if(!isOtpScreen) return <Redirect href="/register" />

  return (
    <Stack>
      <Stack.Screen name="otpScreen" options={{ headerShown: false }} />
      <Stack.Screen name="password" options={{ headerShown: false }} />
    </Stack>
  )
}

export default VerifyLayout