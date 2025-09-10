import { IconSymbol } from "@/components/ui/IconSymbol";
import { useAuth } from "@/hooks/useAuth";
import { Redirect, Tabs } from "expo-router";
import { Platform, SafeAreaView, StatusBar, Text } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export default function TabsLayout() {
  const { user, loading } = useAuth();

  if (loading) {
    return <Text>Loading...</Text>; // Or a splash screen
  }

  if (!user) {
    return <Redirect href="/login" />; // Protect the main app
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen
          name="home/index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="house.fill" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="create/index"
          options={{
            title: "Create",
            tabBarIcon: ({ color }) => (
              <AntDesign name="pluscircle" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile/index"
          options={{
            title: "Profile",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="user-circle" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings/index"
          options={{
            title: "Settings",
            tabBarIcon: ({ color }) => (
              <FontAwesome6 name="gear" size={24} color={color} />
            ),
          }}
        />
        {/* Add other tabs here */}
      </Tabs>

      {/* Your content here */}
    </SafeAreaView>
  );
}
