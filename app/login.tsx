import { Redirect, router, Stack } from "expo-router";
import { Pressable, Text, View } from "react-native";

import { useSession } from "@/providers/ctx";

export default function LogIn() {
  const { signIn, session } = useSession();

  if (session) {
    return <Redirect href="/" />;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Stack.Screen options={{ headerShown: false }} />
      <Pressable
        onPress={() => {
          signIn();
          router.replace("/");
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
      </Pressable>
    </View>
  );
}
