import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { UserProvider } from "@/utils/usercontext";
import { loadUser } from "@/utils/userStorage";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Tabs, useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { Platform } from "react-native";

// Nested component for conditional Tabs
function NavigationTabs() {
  const colorScheme = useColorScheme();
  const [user, setUser] = useState<UserData | null>(null);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const saved = await loadUser();

        console.log("fetchied users");
        if (saved) {
          setUser(saved);
        }
      })();
    }, [])
  );
  if (!user) return null; // user not logged in; handled by stack login elsewhere

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarActiveTintColor: Colors["light"].tint,
        tabBarStyle: Platform.select({
          ios: { position: "absolute" },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="Feed"
        options={{
          title: "Feed",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Create"
        options={{
          title: "Create",
          tabBarIcon: ({ color }) => (
            <AntDesign name="pluscircle" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user-circle" size={24} color={color} />
          ),
        }}
      />

      {/* Conditional tab based on user role */}
      {"user.role" === "admin" ? (
        <Tabs.Screen
          name="Setting"
          options={{
            title: "setting",
            tabBarIcon: ({ color }) => (
              <FontAwesome6 name="gear" size={24} color={color} />
            ),
          }}
        />
      ) : (
        <Tabs.Screen
          name="Setting"
          options={{
            title: "Setting",
            tabBarIcon: ({ color }) => (
              <FontAwesome6 name="gear" size={24} color={color} />
            ),
          }}
        />
      )}
    </Tabs>
  );
}

// Root layout wrapping everything in UserProvider
export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <UserProvider>
      <NavigationTabs />
    </UserProvider>
  );
}
/*
export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <UserProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <NavigationTabs />
      </ThemeProvider>
    </UserProvider>
  );
}
*/
