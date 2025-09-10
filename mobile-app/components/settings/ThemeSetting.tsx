import React, { useState } from "react";
import { Switch } from "react-native";
import SettingItem from "@/components/common/SettingItem";

export default function ThemeSetting() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleTheme = () => setIsDarkMode((previousState) => !previousState);

  return (
    <SettingItem label="Dark Mode">
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
        onValueChange={toggleTheme}
        value={isDarkMode}
      />
    </SettingItem>
  );
}
