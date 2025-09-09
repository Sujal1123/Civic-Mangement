/*import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

// User type
export type User = { name: string; email: string } | null;

// Context
const UserContext = createContext<{
  user: User;
  setUser: (u: User) => void;
}>({ user: null, setUser: () => {} });

export function useUser() {
  return useContext(UserContext);
}

// Provider wrapper
export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);

  // Load from AsyncStorage
  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem("user");
      if (saved) setUser(JSON.parse(saved));
    })();
  }, []);

  // Save to AsyncStorage
  useEffect(() => {
    if (user) {
      AsyncStorage.setItem("user", JSON.stringify(user));
    } else {
      AsyncStorage.removeItem("user");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
*/ import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

// Define the structure of user data
export type UserData = {
  _id: string;
  name: string;
  email: string;
  role: string;
  token: string;
};

// User type can be null or filled with UserData
export type User = UserData | null;

// Create the context with default values
const UserContext = createContext<{
  user: User;
  setUser: (user: User) => void;
}>({
  user: null,
  setUser: () => {},
});

// Custom hook to access user context
export function useUser() {
  return useContext(UserContext);
}

// Helper function to load user from AsyncStorage
export async function loadUser(): Promise<User> {
  try {
    const saved = await AsyncStorage.getItem("user");
    return saved ? (JSON.parse(saved) as User) : null;
  } catch (error) {
    console.error("Failed to load user:", error);
    return null;
  }
}

// Helper function to get only the name from stored user
export async function currentUser(): Promise<string | null> {
  const user = await loadUser();
  return user?.name || null;
}

// The UserProvider component
export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);

  // Load user data when provider mounts
  useEffect(() => {
    (async () => {
      const savedUser = await loadUser();
      if (savedUser) {
        setUser(savedUser);
      }
    })();
  }, []);

  // Save or remove user data when it changes
  useEffect(() => {
    (async () => {
      try {
        if (user) {
          await AsyncStorage.setItem("user", JSON.stringify(user));
        } else {
          await AsyncStorage.removeItem("user");
        }
      } catch (error) {
        console.error("Error saving user data:", error);
      }
    })();
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
