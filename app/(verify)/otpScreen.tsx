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

const OTP_DURATION_MS = 90 * 1000; // 90 seconds

const OtpScreen = () => {

  const router = useRouter();

  const { setPasswordScreen } = useAuthStore();



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



  // verify otp
  const handleOtp = (otp: string) => {

    console.log('OTP => ', otp);

    // verify otp api here

    setPasswordScreen();

    router.navigate('/password');

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

    console.log('Resend OTP');

    // resend otp api here

    // reset end time
    endTimeRef.current = Date.now() + OTP_DURATION_MS;

    // update UI immediately
    setTimeLeft(
      Math.ceil((endTimeRef.current - Date.now()) / 1000)
    );

  };



  return (
    <SafeAreaView className="flex-1 items-center justify-center px-4">

      <VStack className="items-center gap-4">

        <Text className="text-2xl font-bold">
          Verify OTP
        </Text>

        <Text className="text-gray-500">
          Enter your 6-digit code
        </Text>



        <HStack className="w-[90%] md:w-[30%] mt-3">

          <OtpInput
            numberOfDigits={6}
            type="numeric"
            focusColor="green"
            placeholder="******"
            onFilled={handleOtp}
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