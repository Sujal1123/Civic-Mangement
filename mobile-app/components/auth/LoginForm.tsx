import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

type LoginFormProps = {
  type: "admin" | "citizen";
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  onLogin: () => void;
  onNavigateToRegister: () => void;
};

export default function LoginForm({
  type,
  email,
  setEmail,
  password,
  setPassword,
  onLogin,
  onNavigateToRegister,
}: LoginFormProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Login as {type === "admin" ? "Admin" : "Citizen"}
      </Text>
      <TextInput
        placeholder="Enter email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.loginButton} onPress={onLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {type === "citizen" && (
        <>
          <TouchableOpacity
            style={styles.createButton}
            onPress={onNavigateToRegister}
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
  // ... All the styles from your original file go here
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
