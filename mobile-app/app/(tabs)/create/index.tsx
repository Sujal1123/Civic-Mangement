import React from "react";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import { useCreateReportForm } from "@/hooks/useCreateReportForm";
import ReportForm from "@/components/reports/ReportForm";
import MediaPicker from "@/components/reports/MediaPicker";

export default function CreateScreen() {
  const {
    title,
    setTitle,
    description,
    setDescription,
    mediaList,
    loading,
    pickMedia,
    savePost,
  } = useCreateReportForm();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Create New Report</Text>

      <ReportForm
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
      />

      <MediaPicker mediaList={mediaList} onPickMedia={pickMedia} />

      <Button
        title={loading ? "Submitting..." : "Submit Report"}
        onPress={savePost}
        disabled={loading}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
});
