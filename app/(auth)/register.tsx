import { View, Text } from 'react-native'
import React from 'react'
import { Pressable } from '@/components/ui/pressable'
import { Link, router, Stack, useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuthStore } from '@/stores/useAuthStore'
import { Button } from '@/components/ui/button'

const Register = () => {
    const { setOtpScreen } = useAuthStore();
    const router = useRouter()

    const handleClickOtpScreen = () => {
        setOtpScreen()
        router.push("/otpScreen")
    }
    return (
        <SafeAreaView className="flex-1 justify-center items-center">

            <Text>register</Text>
            <Text>Sign Up</Text>

            <Link href="/login"><Text>Login in</Text></Link>
            <Button variant="link" size="sm" className='border px-2 py-1 mt-4 bg-purple-300' onPress={handleClickOtpScreen}><Text>Otp to screen</Text></Button>
        </SafeAreaView>
    )
}

export default Register