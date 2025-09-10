import { StyleSheet, Text, View } from "react-native";
import ThemeSetting from "@/components/settings/ThemeSetting";
import LogoutButton from "@/components/settings/LogoutButton";
import DeleteAccountButton from "@/components/settings/DeleteAccount";

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>

      <ThemeSetting />
      <LogoutButton />
      <DeleteAccountButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
