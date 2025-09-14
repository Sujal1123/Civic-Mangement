import { AuthProvider } from "@/hooks/useAuth";
import { Stack } from "expo-router";
import { useAuth } from "@/hooks/useAuth"; // We need this for the initial check
import { ActivityIndicator, Platform, StatusBar } from "react-native";
import { ThemeProvider } from "@/context/ThemeContext";
import { useNavigationBar } from "@/hooks/usenavigationBar";
import { SystemBars } from "react-native-edge-to-edge";
import { SafeAreaView } from "react-native-safe-area-context";

// A component to handle the initial loading and routing logic
function Root() {
  const { loading } = useAuth();
  // useNavigationBar();
  if (loading) {
    // Show a loading indicator while the auth state is being determined
    return <ActivityIndicator style={{ flex: 1 }} />;
  }

  // The Slot will automatically render the correct group (public, auth, or tabs)
  // This is no longer needed here as the group layouts handle redirection.
  // We use Stack.Screen to define the available routes.
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(public)" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Root />
      </AuthProvider>
    </ThemeProvider>
  );
}
