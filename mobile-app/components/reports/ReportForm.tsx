import { useStylePalette } from "@/constants/StylePalette";
import { useTheme } from "@/hooks/useTheme";
import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

type ReportFormProps = {
  title: string;
  setTitle: (text: string) => void;
  description: string;
  setDescription: (text: string) => void;
};

export default function ReportForm({
  title,
  setTitle,
  description,
  setDescription,
}: ReportFormProps) {
  // 1. Get the effective theme ('light' or 'dark')
  const { effectiveTheme, colors } = useTheme();
  // 2. Pass the theme to the styles function
  //const cstyles = getStyles(effectiveTheme);
  const styles = useStylePalette();
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Enter Title"
        value={title}
        onChangeText={setTitle}
        placeholderTextColor={colors.PlaceholderText}
      />
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Enter Description"
        value={description}
        onChangeText={setDescription}
        placeholderTextColor={colors.PlaceholderText}
        multiline
      />
    </View>
  );
}
