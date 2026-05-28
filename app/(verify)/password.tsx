import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { VStack } from '@/components/ui/vstack'
import { Text } from '@/components/ui/text'
import { Button, ButtonText } from '@/components/ui/button'
import { useAuthStore } from '@/stores/useAuthStore'
import { ActivityIndicator, ScrollView } from 'react-native'
import { HStack } from '@/components/ui/hstack'
import { Image } from 'expo-image'
import { Heading } from '@/components/ui/heading'
import { FormControl, FormControlHelper, FormControlHelperText, FormControlLabel, FormControlLabelText } from '@/components/ui/form-control'
import { Controller, useForm } from 'react-hook-form'
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input'
import { Eye, EyeClosed } from 'lucide-react-native'
import { Divider } from '@/components/ui/divider'
import { router } from 'expo-router'
import { passwordConfirm } from '@/services/auth'
import { useAppToast } from '@/components/Toast'

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const Password = () => {
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { phone, token } = useAuthStore()

  const { control, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch('password');
  const confirmPassword = watch('confirmPassword');
  const passwordsMatch = password === confirmPassword;

  const { handleToast } = useAppToast()
  const { isLoggIn, signIn } = useAuthStore()
  const onSubmit = async (data: any) => {
    setLoading(true)
    try {
      const res = await passwordConfirm({
        phone: phone as string,
        password: data.password,
        token: token as string,
      })
      signIn({
        accessToken: res.token,
        refreshToken: res.refreshToken,
        randomToken: res.randomToken,
      })
      handleToast({ title: "Success", description: res.message, successError: true })

    } catch (error: any) {
      handleToast({ title: "Error", description: error.response.data.message, successError: false })
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView className="flex-1 px-4 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        <HStack className="justify-end items-center mt-2 gap-2">
          <Image
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              borderWidth: 1,
              paddingVertical: 2,
              paddingHorizontal: 2,
            }}
            source={require("@/assets/images/n.png")}
            placeholder={{ blurhash }}
            contentFit="cover"
            transition={1000}
          />
          <Text className="text-xl font-bold"> Store fashion</Text>
        </HStack>

        <VStack className="gap-2">
          <Heading size="2xl" className="leading-snug text-purple-400">
            Confirm Password {"\n"}To Complete Registration
          </Heading>
          <Text className="text-md text-gray-500 font-semibold">
            Both passwords must be the same and must be at least 8 characters.
          </Text>

          <VStack className="mt-4 gap-4">
            <FormControl
              className="gap-2"
              isInvalid={!!errors.password || !!errors.confirmPassword}
              size="md"
            >
              {/* Password Field */}
              <VStack className="gap-1">
                <FormControlLabel>
                  <FormControlLabelText className="text-gray-700 font-semibold text-lg">
                    Password
                  </FormControlLabelText>
                </FormControlLabel>
                <Controller
                  control={control}
                  name="password"
                  rules={{
                    required: {
                      value: true,
                      message: "Password is required.",
                    },
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters.",
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      className="h-16 rounded-lg border-gray-200"
                      size="md"
                    >
                      <InputField
                        type={showPassword ? "text" : "password"}
                        placeholder="********"
                        value={value}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        autoCapitalize="none"
                      />
                      <InputSlot
                        className="pr-3"
                        onPress={() => setShowPassword(!showPassword)}
                      >
                        <InputIcon as={showPassword ? Eye : EyeClosed} />
                      </InputSlot>
                    </Input>
                  )}
                />
                {errors.password && (
                  <Text className="text-red-500">{errors.password.message}</Text>
                )}
              </VStack>

              <FormControlHelper>
                <FormControlHelperText className="text-gray-600">
                  Must be at least 8 characters.
                </FormControlHelperText>
              </FormControlHelper>

              <Divider className="my-2" />

              {/* Confirm Password Field */}
              <VStack className="gap-1">
                <FormControlLabel>
                  <FormControlLabelText className="text-gray-700 font-semibold text-lg">
                    Password Confirmation
                  </FormControlLabelText>
                </FormControlLabel>
                <Controller
                  control={control}
                  name="confirmPassword"
                  rules={{
                    required: {
                      value: true,
                      message: "Please confirm your password.",
                    },

                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      className="h-16 rounded-lg border-gray-200"
                      size="md"
                    >
                      <InputField
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="********"
                        value={value}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        autoCapitalize="none"
                      />
                      <InputSlot
                        className="pr-3"
                        onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        <InputIcon as={showConfirmPassword ? Eye : EyeClosed} />
                      </InputSlot>
                    </Input>
                  )}
                />
                {errors.confirmPassword && (
                  <Text className="text-red-500">
                    {errors.confirmPassword.message}
                  </Text>
                )}
                <FormControlHelper>
                  <FormControlHelperText className="text-gray-600">
                    Must be at least 8 characters.
                  </FormControlHelperText>
                </FormControlHelper>
              </VStack>
            </FormControl>
          </VStack>
          {confirmPassword.length >= 1 && !passwordsMatch && (<Text className='text-red-500'>The passwords do not match.</Text>)}

          <VStack className="mt-6 gap-4">
            <Button
              onPress={handleSubmit(onSubmit)}
              className="bg-blue-600 h-14 rounded-lg justify-center items-center"
              disabled={loading}
            >
              <ButtonText className="text-white text-lg font-semibold">
                {loading ? <ActivityIndicator color={'white'} /> : "Submit"}
              </ButtonText>
            </Button>
          </VStack>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Password