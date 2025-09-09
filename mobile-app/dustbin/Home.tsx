import { getCachedUser, UserData } from "@/utils/userStorage";
import { Stack } from "expo-router";
import { useState } from "react";

function Navigation() {
  const [user, setUser] = useState<UserData | null>(null);
  const loaded = getCachedUser();
  setUser(loaded);
  if (!user) {
    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" />
      </Stack>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Feed" />
      <Stack.Screen name="Profile" />
      {user.admin ? (
        <Stack.Screen name="admin/dashboard" />
      ) : (
        <Stack.Screen name="user/settings" />
      )}
    </Stack>
  );
}

export default function RootLayout() {
  return <Navigation />;
}
