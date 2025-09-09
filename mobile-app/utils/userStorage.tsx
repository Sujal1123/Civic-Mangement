// userStorage.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";

export type UserData = {
  _id: string;
  name: string;
  email: string;
  role: string;
  token: string;
};

const USER_KEY = "user_data";

/**
 * Save user data to AsyncStorage
 */
export async function saveUser(user: UserData): Promise<void> {
  try {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
    console.log("User saved successfully");
  } catch (error) {
    console.error("Error saving user:", error);
  }
}

/**
 * Load user data from AsyncStorage
 */
export async function loadUser(): Promise<UserData | null> {
  try {
    const json = await AsyncStorage.getItem(USER_KEY);
    if (json != null) {
      return JSON.parse(json) as UserData;
    }
    return null;
  } catch (error) {
    console.error("Error loading user:", error);
    return null;
  }
}

/**
 * Remove user data from AsyncStorage (for logout)
 */
export async function removeUser(): Promise<void> {
  try {
    await AsyncStorage.removeItem(USER_KEY);
    console.log("User removed successfully");
  } catch (error) {
    console.error("Error removing user:", error);
  }
}
