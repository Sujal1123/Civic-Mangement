//import { useUser } from "@/context/usercontext";
import { useLocalSearchParams, useRouter } from "expo-router";

import { login } from "@/utils/api";
import { loadUser, saveUser, UserData } from "@/utils/userStorage";
import { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Login() {
  //const { setUser } = useUser();
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setName] = useState("");

  const { type } = useLocalSearchParams<{ type?: string }>();

  const [user, setUser] = useState<UserData | null>(null);
  useEffect(() => {
    (async () => {
      const loaded = await loadUser();
      setUser(loaded);
    })();
  }, []);

  /*
  //fix
  const handleLogin = async () => {
    //const saved = await AsyncStorage.getItem("user");
    if (user) {
      //const parsed = JSON.parse(saved);
      if (user.email === email) {
        if (type === "user" || (type === "admin" && user.admin)) {
          //setUser(user.username);
          alert(`Logging in as ${type || "user"} with email ${email}`);
          router.replace("/home/Feed");
        } else {
          alert(`email ${email} is not Admin!`);
        }
      } else {
        Alert.alert("Error", "Email not found. Please register first.");
      }
    } else {
      Alert.alert("Error", "No registered user. Please register first.");
    }
  };
*/
  const handleLogin = async () => {
    try {
      const user = await login(email, password);
      if (type === "citizen" || (type === "admin" && user.role === "admin")) {
        await saveUser(user);
        Alert.alert("Welcome!", `Hello ${user.name}`);
        router.replace("/home/Feed"); // Navigate after login
      } else {
        alert(`email ${email} is not Admin!`);
      }
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Login as {type === "admin" ? "Admin" : "citizen"}
      </Text>
      <TextInput
        placeholder="Enter email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {type === "citizen" && (
        <>
          <TouchableOpacity
            style={styles.createButton}
            onPress={() => router.push("/register")}
          >
            <Text style={styles.buttonText}>No account? Register</Text>
          </TouchableOpacity>
          <Text style={styles.userNote}>
            Users can login with their registered email address.
          </Text>
        </>
      )}

      {type === "admin" && (
        <Text style={styles.adminNote}>
          Admins must enter credentials provided by the organization.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    width: "90%",
    marginBottom: 15,
    borderRadius: 8,
  },
  adminNote: { color: "red", margin: 10, textAlign: "center" },
  userNote: { color: "green", margin: 10, textAlign: "center" },
  loginButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    width: 300,
    alignItems: "center",
    marginTop: 20,
  },
  createButton: {
    backgroundColor: "#459cffff",
    padding: 15,
    borderRadius: 8,
    width: 300,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
///import { TouchableOpacity } from "react-native";
/*
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";

export default function Login() {
  const { type } = useLocalSearchParams<{ type?: string }>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // handle login based on type (user or admin)
    alert(`Logging in as ${type || "user"} with email ${email}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login as {type === "admin" ? "Admin" : "User"}</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
  },
});

*/
