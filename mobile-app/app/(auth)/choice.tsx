import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useChoiceNavigation } from "@/hooks/useChoiceNavigation";
import ChoiceButton from "@/components/common/ChoiceButton";

export default function ChoiceScreen() {
  const { navigateToRegister, navigateToLogin, navigateBack } =
    useChoiceNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select an Option</Text>
      <ChoiceButton
        title="Create Account"
        onPress={navigateToRegister}
        color="#5bc0de"
      />
      <ChoiceButton
        title="Login as User"
        onPress={() => navigateToLogin("citizen")}
        color="#5cb85c"
      />

      <ChoiceButton title="Back" onPress={navigateBack} color="#6c757d" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#333",
  },
});
