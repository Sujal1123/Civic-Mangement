import DeleteButton from "@/components/ui/deleteaccount";
import { StyleSheet, Text, View } from "react-native";
import LogoutButton from "../../components/ui/logoutbutton";
import ThemeSetting from "../../components/ui/themesetting";
// Import other sections as needed

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>
      <ThemeSetting />
      <LogoutButton />
      <DeleteButton />
      {/* Add other sections here */}
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
