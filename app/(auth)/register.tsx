import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Pressable } from '@/components/ui/pressable'
import { Link, router, Stack, useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuthStore } from '@/stores/useAuthStore'
import { Button, ButtonText } from '@/components/ui/button'
import { ScrollView } from 'react-native'
import { HStack } from '@/components/ui/hstack'
import { Image } from 'expo-image'
import { VStack } from '@/components/ui/vstack'
import { Heading } from '@/components/ui/heading'
import { FormControl, FormControlLabel, FormControlLabelText} from '@/components/ui/form-control'
import { Controller, useForm } from 'react-hook-form'
import { ActivityIndicator } from 'react-native'
import { Input, InputField } from '@/components/ui/input'
import { registerPost } from '@/services/auth'
import { useAppToast } from '@/components/Toast'


const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";
const Register = () => {
    const { setOtpScreen } = useAuthStore();
    const router = useRouter()
    const [isLoading,setIsLoading] = useState(false)


    const { handleToast } = useAppToast()
    //formstate
    const {
        control,
        handleSubmit,
        formState: { errors },
      } = useForm({
        defaultValues: {
          phone: "",
        },
      });

      

    const onSubmit = async(data:any) => {
        try {
            setIsLoading(true)
            const res = await registerPost(data)
            const {token,phone} = res
            setOtpScreen({token,phone})
            handleToast({title:"Success",description:res.message,successError:true})
            router.navigate("/otpScreen")
            
        } catch (error:any) {
            handleToast({title:"Error",description:error.response.data.message,successError:false})
            
        }
        finally{
            setIsLoading(false)
        }
        
    }
        return (
            <SafeAreaView className="flex-1 px-4 bg-white">
                <HStack className="justify-end items-center  mt-2 gap-2">
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
                <VStack className=" gap-2">
                  <Heading size="3xl" className="leading-snug text-purple-400">
                    Sign Up {"\n"}To Your Account
                  </Heading>
                  <Text className="text-md text-gray-500 font-semibold">
                   Already have an account? <Link href="/login"><Text className='text-blue-500 font-semibold underline'>Sign In</Text></Link>
                  </Text>
                  <VStack className=" mt-4 gap-4">
                    <FormControl
                      className="gap-2"
                      //isInvalid={isInvalid}
                      size="md"
                    // isDisabled={false}
                    // isReadOnly={false}
                    // isRequired={false}
                    >
                      <VStack className="gap-1">
                        <FormControlLabel>
                          <FormControlLabelText className="text-gray-700 font-semibold text-lg">
                            Phone Number
                          </FormControlLabelText>
                        </FormControlLabel>
                        <Controller
                          control={control}
                          name="phone"
                          rules={{
                            required: {
                              value: true,
                              message: "Phone number is required.",
                            },
                            minLength: {
                              value: 7,
                              message: "Phone number must be at least 7 digits.",
                            },
                            maxLength: {
                              value: 12,
                              message: "Phone number must be at most 12 digits.",
                            },
                            pattern: {
                              value: /^\+?\d{7,12}$/,
                              message: "Invalid phone number format.",
                            },
                          }}
                          render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                              className="h-16 rounded-lg border-gray-200"
                              size="md"
                            >
                              <InputField
                                type="text"
                                placeholder="+66 XXXXXXXXX"
                                value={value}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                inputMode="numeric"
                                maxLength={12}
                              />
                            </Input>
                          )}
                        />
                        {errors.phone && (
                          <Text className={"text-red-500"}>{errors.phone.message}</Text>
                        )}
                      </VStack>
                      {/* <FormControlHelper>
                        <FormControlHelperText>
                          Must be at least 6 characters.
                        </FormControlHelperText>
                      </FormControlHelper> */}
                      {/* <FormControlError>
                        <FormControlErrorIcon
                          as={AlertCircleIcon}
                          className="text-red-500"
                        />
                        <FormControlErrorText className="text-red-500">
                          At least 6 characters are required.
                        </FormControlErrorText>
                      </FormControlError> */}
        
                      
                    </FormControl>
                  </VStack>
                  
                  <VStack className="mt-2 gap-4">
                    <Button
                      onPress={handleSubmit(onSubmit)}
                      className="bg-blue-600 h-14 rounded-lg justify-center items-center"
                    >
                      <ButtonText className="text-white text-lg font-semibold">
                        {isLoading ? <ActivityIndicator color={'white'} /> : "Sign Up"}
                      </ButtonText>
                    </Button>
                    
                  </VStack>
                </VStack>
            </SafeAreaView>
          );
}

export default Register