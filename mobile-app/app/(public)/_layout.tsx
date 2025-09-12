import { Stack } from "expo-router";
import { Platform, SafeAreaView, StatusBar } from "react-native";

export default function PublicLayout() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaView>
  );
}
