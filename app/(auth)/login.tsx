import { useAuthStore } from "@/stores/useAuthStore";
import { Link, Redirect, router, Stack, useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";


export default function LogIn() {
  const { signIn, isLoggIn } = useAuthStore();



  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Stack.Screen options={{ headerShown: false }} />
      <Pressable
        onPress={() => {
          signIn();
        }}
        style={({ pressed }) => ({
          backgroundColor: pressed ? "#0a7ea4" : "#1f97d4",
          padding: 12,
          borderRadius: 8,
        })}
      >
        <Text style={{ color: "#1e1515ff", fontSize: 16, fontWeight: "bold" }}>
          Sign In
        </Text>
        <Link href="/register"><Text>Register</Text></Link>

      </Pressable>
    </View>
  );
}
