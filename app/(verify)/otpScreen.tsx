import { Alert, Text } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { OtpInput } from 'react-native-otp-entry';

import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Button } from '@/components/ui/button';

import { useAuthStore } from '@/stores/useAuthStore';
import { FormatSecond } from '@/utils/FormatSecondToMinSe';
import { usePreventRemove } from '@react-navigation/native';
import { Heading } from '@/components/ui/heading';
import { ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { verifyOTPPost } from '@/services/auth';
import { useAppToast } from '@/components/Toast';

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const OTP_DURATION_MS = 90 * 1000; // 90 seconds

const OtpScreen = () => {

  const router = useRouter();
  const [isSubmiting, setIsSubmitting] = useState<boolean>(false);

  const { setPasswordScreen, phone, token } = useAuthStore();



  // store otp expire time
  const endTimeRef = useRef(
    Date.now() + OTP_DURATION_MS
  );



  // initial remaining time
  const [timeLeft, setTimeLeft] = useState(() =>
    Math.max(
      0,
      Math.ceil((endTimeRef.current - Date.now()) / 1000)
    )
  );

  const { handleToast } = useAppToast();

  // verify otp
  const handleOtp = async (otp: string) => {
    setIsSubmitting(true);
    try {

      const res: any = await verifyOTPPost({
        phone: phone as string,
        otp: otp,
        token: token as string
      });
      setPasswordScreen({ token: res.token });

      router.navigate('/password');
      handleToast({ title: "Success", description: res.message, successError: true })


    } catch (error: any) {
      if (error) {
        const errorMessage = typeof error === 'string' ? error : (error?.response?.data?.message || error?.message || "Something went wrong");
        handleToast({ title: "Fail", description: errorMessage, successError: false })
      }
    } finally {
      setIsSubmitting(false);
    }
  };



  // countdown timer
  useEffect(() => {

    const timer = setInterval(() => {

      const remaining = Math.max(
        0,
        Math.ceil((endTimeRef.current - Date.now()) / 1000)
      );

      setTimeLeft(remaining);

    }, 500);

    return () => clearInterval(timer);

  }, []);

  //
  usePreventRemove(timeLeft > 0, () => {
    Alert.alert('Hold On!', `Please wait ${FormatSecond(timeLeft)} before leaving`), [
      {
        text: 'ok',
        style: 'default',
      },
      {

      }

    ]
  })

  // resend otp
  const handleResendOtp = () => {


    // resend otp api here

    // reset end time
    endTimeRef.current = Date.now() + OTP_DURATION_MS;

    // update UI immediately
    setTimeLeft(
      Math.ceil((endTimeRef.current - Date.now()) / 1000)
    );

  };



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
        <Heading size="xl" className="leading-snug text-purple-400">
          Verify OTP {"\n"}To Continuous Registeration
        </Heading>
        <Text className="text-md text-gray-500 font-semibold">
          we sent a SMS OTP To your phone number
        </Text>

        <HStack className="w-[90%] md:w-[30%] mt-3">

          <OtpInput
            numberOfDigits={6}
            type="numeric"
            focusColor="purple"
            placeholder="******"
            onFilled={handleOtp}
            disabled={isSubmiting}
          />

        </HStack>



        {timeLeft > 0 ? (

          <Text className="text-center mt-2">
            Time Remaining : {FormatSecond(timeLeft)} s
          </Text>

        ) : (

          <Button
            onPress={handleResendOtp}
            className="mt-2 px-5"
          >
            <Text className="text-white font-semibold">
              Resend OTP
            </Text>
          </Button>

        )}

      </VStack>

    </SafeAreaView>
  );
};

export default OtpScreen;