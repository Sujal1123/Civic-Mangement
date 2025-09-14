import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import PostDetails from "@/components/reports/PostDetails";
import BackButton from "@/components/common/BackButton";
import { Post } from "@/lib/types";
import { useTheme } from "@/context/ThemeContext";
import { SafeAreaView } from "react-native-safe-area-context";
import ThemeCycleButton from "@/components/theming/ThemeCycleButton";

export default function PostDetailScreen() {
  const { post: postString } = useLocalSearchParams<{ post: string }>();
  // ✅ Get the theme at the top of the component
  const { effectiveTheme } = useTheme();
  // ✅ Pass the theme to the styles function
  const styles = getStyles(effectiveTheme);

  // If for some reason the post data isn't passed, show a themed error.
  if (!postString) {
    return (
      // ✅ Styles are now applied from your dynamic stylesheet
      <View style={styles.centered}>
        <SafeAreaView
          edges={["top", "left", "right", "bottom"]}
          style={{ flex: 1 }}
        >
          <Text style={styles.errorText}>Post data not found.</Text>
        </SafeAreaView>
      </View>
    );
  }

  const post: Post = JSON.parse(postString);
  const headerIconColor = effectiveTheme === "dark" ? "#FFFFFF" : "#000000";

  return (
    <>
      <ThemeCycleButton></ThemeCycleButton>
      <Stack.Screen
        options={{
          title: post.title,
        }}
      />
      <PostDetails post={post} />
    </>
  );
}

// ✅ The stylesheet now includes styles for the error message
const getStyles = (theme: "light" | "dark") => {
  const isDark = theme === "dark";

  return StyleSheet.create({
    centered: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: isDark ? "#121212" : "#FFFFFF",
    },
    errorText: {
      fontSize: 16,
      color: isDark ? "#A0A0A0" : "#666666",
    },
  });
};
