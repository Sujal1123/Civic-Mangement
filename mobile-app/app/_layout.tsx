import { loadUser, UserData } from "@/utils/userStorage";
import { router, Stack } from "expo-router";
import { useEffect, useState } from "react";
// User type
/*
type User = { name: string; email: string } | null;

// Context
const UserContext = createContext<{
  user: User;
  setUser: (u: User) => void;
}>({ user: null, setUser: () => {} });

export function useUser() {
  return useContext(UserContext);
}
*/

export default function RootLayout() {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    (async () => {
      const saved = await loadUser();
      console.log("Welcome Saved user:", saved);
      if (saved) {
        setUser(saved);
      }
    })();
  }, []);

  if (user) {
    router.replace({
      pathname: "/home/Feed",
      params: {
        user: JSON.stringify(user), // Pass as string because routes only support serializable params
      },
    });
  }

  /*
  if (user) {
    router.replace("/home/Feed");
  }*/
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="home" />
      ) : (
        <>
          <Stack.Screen name="register" />
          <Stack.Screen name="login" />
        </>
      )}
    </Stack>
  );
}
/*
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Stack screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="home" />
        ) : (
          <>
            <Stack.Screen name="register" />
            <Stack.Screen name="login" />
          </>
        )}
      </Stack>
    </UserContext.Provider>
  );
}*/
