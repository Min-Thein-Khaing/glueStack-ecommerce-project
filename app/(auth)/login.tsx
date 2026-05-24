import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useAuthStore } from "@/stores/useAuthStore";
import { Image } from "expo-image";
import { ScrollView, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  FormControl,
  FormControlLabel,
  FormControlError,
  FormControlErrorText,
  FormControlErrorIcon,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { AlertCircleIcon, Icon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { useForm, Controller } from "react-hook-form";
import { Eye, EyeClosed } from "lucide-react-native";
import React from "react";
import { Pressable } from "@/components/ui/pressable";
import { Divider } from "@/components/ui/divider";
import { router } from "expo-router";
import { Button, ButtonText } from "@/components/ui/button";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";
export default function LogIn() {
  const { signIn, isLoggIn } = useAuthStore();
  const [showPass, setShowPass] = React.useState(false);
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
  const onSubmit = () => {
    console.log("submit");
    console.log(control);
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
                    required: true,
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
                      />
                    </Input>
                  )}
                />
                {errors.phone && (
                  <FormControlError>
                    <FormControlErrorIcon
                      as={AlertCircleIcon}
                      className="text-red-500"
                    />
                    <FormControlErrorText className="text-red-500">
                      Phone number is required.
                    </FormControlErrorText>
                  </FormControlError>
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
                    required: true,
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
                  <FormControlError>
                    <FormControlErrorIcon
                      as={AlertCircleIcon}
                      className="text-red-500"
                    />
                    <FormControlErrorText className="text-red-500">
                      Password is required.
                    </FormControlErrorText>
                  </FormControlError>
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
            <Button className="bg-blue-600 h-14 rounded-lg justify-center items-center">
              <ButtonText className="text-white text-lg font-semibold">
                Sign In
              </ButtonText>
            </Button>
            <Divider />
            <Text className="text-center font-medium">Create account ?</Text>
            <Button
              onPress={() => router.push("/register")}
              className="bg-blue-400  h-14 rounded-lg justify-center items-center"
            >
              <ButtonText className="text-white text-lg font-semibold" >
                Register
              </ButtonText>
            </Button>
          </VStack>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
