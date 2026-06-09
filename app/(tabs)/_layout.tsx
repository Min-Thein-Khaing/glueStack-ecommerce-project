import { Redirect, Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useAuthStore } from "@/stores/useAuthStore";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { isLoggIn, _hasHydrated } = useAuthStore();

  if (!_hasHydrated) {
    return null;
  }

  if (!isLoggIn) {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // tabBarInactiveTintColor:"#687076",
        headerShown: false,
        tabBarButton: HapticTab,

        //dr ka not show label
        // tabBarShowLabel: false,

        //tabBarShowLabel is false we give but that icon not take label place
        // tabBarStyle: {
        //   height: 56,
        //   backgroundColor: "fff",
        //   borderTopWidth: 1,
        //   borderTopColor: "#f0f0f0",
        //   paddingTop: 8,
        // },
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="cart.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="person.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
