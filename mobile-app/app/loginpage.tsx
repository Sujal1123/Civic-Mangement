import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ChoiceScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => router.push("/register")}
      >
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.registerButton}
        onPress={() =>
          router.push({ pathname: "/login", params: { type: "citizen" } })
        }
      >
        <Text style={styles.buttonText}>Login as User</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.registerButton}
        onPress={() =>
          router.push({ pathname: "/login", params: { type: "admin" } })
        }
      >
        <Text style={styles.buttonText}>Login as Official</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => router.push("/")}
      >
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>

      <View style={{ height: 20 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    width: "60%",
    alignItems: "center",
    marginTop: 20,
  },
  registerButton: {
    backgroundColor: "#459cffff",
    padding: 15,
    borderRadius: 8,
    width: "60%",
    alignItems: "center",
    marginTop: 20,
  },
  officialButton: {
    backgroundColor: "#459cffff",
    padding: 15,
    borderRadius: 8,
    width: "60%",
    alignItems: "center",
    marginTop: 20,
  },
});
