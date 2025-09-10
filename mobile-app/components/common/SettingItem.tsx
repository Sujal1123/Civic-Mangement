import React, { ReactNode } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

type SettingItemProps = {
  label: string;
  children: ReactNode;
  onPress?: () => void;
};

export default function SettingItem({
  label,
  children,
  onPress,
}: SettingItemProps) {
  return (
    <TouchableOpacity onPress={onPress} disabled={!onPress}>
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <View>{children}</View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  label: {
    fontSize: 16,
  },
});
