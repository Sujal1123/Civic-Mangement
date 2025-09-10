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
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Enter Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Enter Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 15,
  },
});
