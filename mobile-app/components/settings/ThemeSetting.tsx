import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import SettingItem from "@/components/common/SettingItem";
import { Picker } from "@react-native-picker/picker";

export default function ThemeSetting() {
  // ✅ Get the user's preference ('system', 'light', or 'dark') and the setter
  const { themeOption, setThemeOption } = useTheme();

  return (
    <SettingItem label="Theme">
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={themeOption}
          onValueChange={(itemValue) => setThemeOption(itemValue)}
          style={styles.picker}
          dropdownIconColor="#007BFF"
        >
          <Picker.Item label="Automatic" value="system" />
          <Picker.Item label="Light" value="light" />
          <Picker.Item label="Dark" value="dark" />
        </Picker>
      </View>
    </SettingItem>
  );
}

const styles = StyleSheet.create({
  pickerContainer: {
    height: 50,
    width: 150,
    justifyContent: "center",
  },
  picker: {
    width: "100%",
  },
});
