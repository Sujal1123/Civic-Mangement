import { register } from "@/utils/api";
import { loadUser, saveUser, UserData } from "@/utils/userStorage";
import { Checkbox } from "@futurejj/react-native-checkbox";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
//chnage logic
export default function Register() {
  const [user, setUser] = useState<UserData | null>(null);
  const router = useRouter();
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("citizen");

  const [isEnabled, setIsEnabled] = useState(false);
  const [admin, setChecked] = useState(false);

  useEffect(() => {
    (async () => {
      const loaded = await loadUser();
      setUser(loaded);
    })();
  }, []);
  /*
  const handleRegister = () => {
    if (!name || !email) return;
    setUser({ name, email,password });
    router.replace("/Home"); // go to home after register
  };*/
  /*
  const handleRegister = async () => {
    await saveUser({ username, email, password, admin });
    const loaded = await loadUser();
    setUser(loaded);
    alert(`Registered Successfully!${username}`);
    //router.replace("/Home");
  };
  */
  const handleRegister = async () => {
    try {
      if (admin) {
        setRole("admin");
      }
      const user = await register(username, email, password, role);
      await saveUser(user);
      alert(`Registered!, Welcome ${user.name}`);
      router.replace("/home/Feed"); // Navigate after registration
    } catch (error: any) {
      alert("Error");
    }
  };

  const toggleCheckbox = () => {
    setChecked(!admin);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register 📝</Text>
      <TextInput
        placeholder="Enter name"
        style={styles.input}
        value={username}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Enter email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Enter password"
        style={styles.input}
        value={password} // bind to password state
        onChangeText={setPassword} // update password state
        secureTextEntry={true} // hide input
      />
      <View style={styles.checkboxContainer}>
        <Checkbox
          status={admin ? "checked" : "unchecked"}
          onPress={toggleCheckbox}
        />
        <Text style={styles.label}>Admin?(For testing)</Text>
      </View>
      <TouchableOpacity style={styles.createButton} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() =>
          router.push({ pathname: "/login", params: { type: "user" } })
        }
      >
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
