import { Stack } from "expo-router";
import { Platform, SafeAreaView, StatusBar } from "react-native";

export default function PublicLayout() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaView>
  );
}
