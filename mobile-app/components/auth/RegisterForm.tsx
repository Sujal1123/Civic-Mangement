import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Checkbox } from "@futurejj/react-native-checkbox";

type RegisterFormProps = {
  username: string;
  setUsername: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  isAdmin: boolean;
  toggleAdmin: () => void;
  onRegister: () => void;
  onNavigateToLogin: () => void;
};

export default function RegisterForm({
  username,
  setUsername,
  email,
  setEmail,
  password,
  setPassword,
  isAdmin,
  toggleAdmin,
  onRegister,
  onNavigateToLogin,
}: RegisterFormProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register 📝</Text>
      <TextInput
        placeholder="Enter name"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Enter email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Enter password"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <View style={styles.checkboxContainer}>
        <Checkbox
          status={isAdmin ? "checked" : "unchecked"}
          onPress={toggleAdmin}
        />
        <Text style={styles.label}>Admin? (For testing)</Text>
      </View>
      <TouchableOpacity style={styles.createButton} onPress={onRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton} onPress={onNavigateToLogin}>
        <Text style={styles.buttonText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
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
    alignItems: "center",
    borderRadius: 8,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  label: {
    marginLeft: 8,
    fontSize: 18,
  },
  loginButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    width: 300,
    borderRadius: 8,
    alignItems: "center",
    textAlign: "center",
    marginTop: 20,
  },
  createButton: {
    backgroundColor: "#459cffff",
    padding: 15,
    width: 300,
    borderRadius: 8,
    alignItems: "center",
    textAlign: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
});
