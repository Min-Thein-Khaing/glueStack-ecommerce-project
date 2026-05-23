import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { VStack } from '@/components/ui/vstack'
import { Text } from '@/components/ui/text'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/stores/useAuthStore'

const Password = () => {
    const {signIn} = useAuthStore()
    const handleSubmitHome= () => {
        signIn()
    }    
  return (
    <SafeAreaView className='flex-1 items-center justify-center'>
      <VStack>
        <Text>password</Text>
        <Button onPress={handleSubmitHome}><Text>Submit</Text></Button>
      </VStack>
    </SafeAreaView>
  )
}

export default Password