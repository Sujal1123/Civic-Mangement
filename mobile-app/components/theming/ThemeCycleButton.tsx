import React from "react";
import { Pressable, StyleSheet, ViewStyle } from "react-native";
// ✅ Make sure to import from your StyleSheet-based context hook
import { useTheme } from "@/context/ThemeContext";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

// Define the type for valid icon names
type IconName = keyof typeof MaterialCommunityIcons.glyphMap;

// Define the cycle order and corresponding icons
const themeCycle = ["system", "light", "dark"] as const;
const themeIcons: Record<(typeof themeCycle)[number], IconName> = {
  system: "theme-light-dark",
  light: "white-balance-sunny",
  dark: "moon-waning-crescent",
};

type ThemeCycleButtonProps = {
  style?: ViewStyle;
  size?: number;
  color?: string;
};

export default function ThemeCycleButton({
  style,
  size = 24,
  color = "#007BFF",
}: ThemeCycleButtonProps) {
  // ✅ Get the user's selected option and the setter function
  const { themeOption, setThemeOption } = useTheme();

  const handlePress = () => {
    const currentIndex = themeCycle.indexOf(themeOption);
    // Cycle to the next theme in the array
    const nextIndex = (currentIndex + 1) % themeCycle.length;
    setThemeOption(themeCycle[nextIndex]);
  };

  // ✅ Get the correct icon name for the current theme option
  const iconName = themeIcons[themeOption];

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.button,
        { opacity: pressed ? 0.6 : 1.0 },
        style,
      ]}
      hitSlop={10} // Makes the button easier to tap
    >
      <MaterialCommunityIcons name={iconName} size={size} color={color} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 8,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
