import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useTheme } from "@/context/ThemeContext";
const { width, height } = Dimensions.get("screen");
export default function WelcomeContent() {
  const router = useRouter();

  // 1. Get the effective theme ('light' or 'dark')
  const { effectiveTheme } = useTheme();
  const gradientEndColor = effectiveTheme === "dark" ? "#121212" : "#FFFFFF";
  // 2. Pass the theme to the styles function
  const styles = getStyles(effectiveTheme);
  return (
    <View style={styles.contentContainer}>
      <LinearGradient
        // ✅ The gradient now goes from transparent to the theme's background color
        colors={["transparent", gradientEndColor]}
        // The gradient starts at the top (0) and ends at the 10% mark (0.1)
        locations={[0, 0.1]}
        style={styles.gradient}
      />

      <Text style={styles.subtitle2}></Text>
      <Text style={styles.title}>Welcome to CivicLink</Text>

      <Text style={styles.subtitle2}></Text>
      <Text style={styles.subtitle1}>
        The simplest way to get civic problems solved.
      </Text>
      <Text style={styles.subtitle2}></Text>
      <Text style={styles.subtitle1}>
        Click The button below to get started!
      </Text>

      <Text style={styles.subtitle2}></Text>
      <TouchableOpacity
        style={styles.getStartedButton}
        onPress={() => router.push("/choice")}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.learnMoreButton}
        onPress={() => router.push("/choice")}
      >
        <Text style={styles.buttonText}>Learn More</Text>
      </TouchableOpacity>
    </View>
  );
}

export const getStyles = (theme: "light" | "dark") => {
  const isDark = theme === "dark";

  // Define colors for each theme
  const colors = {
    title: isDark ? "#FFFFFF" : "#333333",
    subtitle: isDark ? "#A0A0A0" : "#666666",
    buttonBg: isDark ? "#3B82F6" : "#007BFF",
    buttonText: "#FFFFFF",
  };

  return StyleSheet.create({
    contentContainer: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      padding: 30,
      height: height * 0.6,
      zIndex: 4,
      paddingBottom: "15%",
      alignItems: "center",
    },
    gradient: {
      ...StyleSheet.absoluteFillObject,
      width: width,
      bottom: 0,
      left: 0,
      right: 0,
      padding: 0,
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      marginBottom: 10,
      color: colors.title,
      textAlign: "center",
    },
    subtitle: {
      fontSize: 16,
      color: colors.subtitle,
      marginBottom: 30,
      textAlign: "center",
    },
    subtitle1: {
      fontSize: 18,
      color: colors.subtitle,
      marginBottom: 10,
      marginTop: 10,
      textAlign: "center",
    },
    subtitle2: {
      fontSize: 14,
      color: colors.subtitle,
      marginBottom: 5,
      textAlign: "justify",
    },
    getStartedButton: {
      backgroundColor: colors.buttonBg,
      paddingVertical: 15,
      paddingHorizontal: 60,
      borderRadius: 30,
      alignItems: "center",
    },
    buttonText: {
      color: colors.buttonText,
      fontSize: 16,
      fontWeight: "bold",
    },
    learnMoreButton: {
      backgroundColor: colors.buttonBg,
      paddingVertical: 15,
      paddingHorizontal: 60,
      borderRadius: 30,
      marginTop: 10,
      alignItems: "center",
    },
  });
};
