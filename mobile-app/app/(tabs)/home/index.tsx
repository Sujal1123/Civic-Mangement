import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useUserData } from "@/hooks/useUserData";
import { useReports } from "@/hooks/useReports";
import ReportList from "@/components/reports/ReportList";

export default function FeedScreen() {
  const user = useUserData();
  const { posts, loading } = useReports();

  if (loading) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome Back, {user?.name}</Text>
      <ReportList posts={posts} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    padding: 16,
  },
  loadingText: {
    flex: 1,
    textAlign: "center",
    textAlignVertical: "center",
  },
});
