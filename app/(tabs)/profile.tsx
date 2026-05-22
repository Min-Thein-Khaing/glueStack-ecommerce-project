import { Pressable, Text, View } from "react-native";

import { useSession } from "@/providers/ctx";
import { Tabs } from "expo-router";

export default function Profile() {
  const { signOut } = useSession();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Tabs.Screen options={{ title: "My Profile", headerShown: false }} />
      <Pressable
        onPress={signOut}
        style={({ pressed }) => ({
          backgroundColor: pressed ? "#0a7ea4" : "#1f97d4",
          padding: 12,
          borderRadius: 8,
        })}
      >
        <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>
          Sign Out
        </Text>
      </Pressable>
    </View>
  );
}