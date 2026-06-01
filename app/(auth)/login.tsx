import { useAppToast } from "@/components/Toast";
import { Button, ButtonText } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { AlertCircleIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { loginPost } from "@/services/auth";
import { useAuthStore } from "@/stores/useAuthStore";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { router } from "expo-router";
import { Eye, EyeClosed } from "lucide-react-native";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";
export default function LogIn() {
  const { signIn, isLoggIn } = useAuthStore();
  const [showPass, setShowPass] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  //for toast
  const { handleToast } = useAppToast()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phone: "",
      password: "",
    },
  });
  const onSubmit = async (data: { phone: string; password: string }) => {
    try {
      setLoading(true);
      const res = await loginPost(data);
      const { refreshToken, randToken, token } = res;
      signIn({ accessToken: token, refreshToken, randomToken: randToken });
      handleToast({ title: "Success", description: res.message, successError: true })

    } catch (error: any) {
        const errorMessage = error?.message || error?.response?.data?.message || 'Login failed'
        handleToast({ title: "Fail", description: errorMessage, successError: false })
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView className="flex-1 px-4 bg-white">
      <ScrollView>
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
            Sign In {"\n"}To Your Account
          </Heading>
          <Text className="text-md text-gray-500 font-semibold">
            Enter your phone & password to sign in
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

              <VStack className="gap-1">
                <FormControlLabel>
                  <FormControlLabelText>Password</FormControlLabelText>
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
                    // pattern: {
                    //   value: /^(?=.*[a-zA-Z])(?=.*\d)/,
                    //   message: "Password must contain letters and numbers.",
                    // },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      className="h-16 rounded-lg border-gray-200"
                      size="md"
                    >
                      <InputField
                        type={showPass ? "text" : "password"}
                        placeholder="********"
                        value={value}
                        onBlur={onBlur}
                        onChangeText={onChange}
                      />

                      <InputSlot
                        className="pr-3"
                        onPressIn={() => setShowPass(true)}
                        onPressOut={() => setShowPass(false)}
                      >
                        <InputIcon as={showPass ? Eye : EyeClosed} />
                      </InputSlot>
                    </Input>
                  )}
                />
                {errors.password && (
                  <Text className={"text-red-500"}>
                    {errors.password.message}
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
          <Text className="self-end text-blue-500 font-bold underline">
            Forget Password
          </Text>
          <VStack className="mt-2 gap-4">
            <Button
              onPress={handleSubmit(onSubmit)}
              className="bg-blue-600 h-14 rounded-lg justify-center items-center"
            >
              <ButtonText className="text-white text-lg font-semibold">
                {loading ? <ActivityIndicator color={'white'} /> : "Sign In"}
              </ButtonText>
            </Button>
            <Divider />
            <Text className="text-center font-medium">Create account ?</Text>
            <Button
              onPress={() => router.push("/register")}
              className="bg-blue-400 h-14 rounded-lg justify-center items-center"
            >
              <ButtonText className="text-white text-lg font-semibold">
                Register
              </ButtonText>
            </Button>
          </VStack>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}

