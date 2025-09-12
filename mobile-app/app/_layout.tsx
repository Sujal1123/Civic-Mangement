import { AuthProvider } from "@/hooks/useAuth";
import { Stack } from "expo-router";
import { useAuth } from "@/hooks/useAuth"; // We need this for the initial check
import {
  ActivityIndicator,
  Platform,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { ThemeProvider } from "@/context/ThemeContext";
import { useNavigationBar } from "@/hooks/usenavigationBar";

// A component to handle the initial loading and routing logic
function Root() {
  const { loading } = useAuth();
  useNavigationBar();
  if (loading) {
    // Show a loading indicator while the auth state is being determined
    return <ActivityIndicator style={{ flex: 1 }} />;
  }

  // The Slot will automatically render the correct group (public, auth, or tabs)
  // This is no longer needed here as the group layouts handle redirection.
  // We use Stack.Screen to define the available routes.
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(public)" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </SafeAreaView>
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
