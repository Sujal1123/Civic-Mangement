import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { Post } from "@/lib/types";
import { useTheme } from "@/context/ThemeContext";

export default function PostDetails({ post }: { post: Post }) {
  // 1. Get the effective theme ('light' or 'dark')
  const { effectiveTheme } = useTheme();
  // 2. Pass the theme to the styles function
  const styles = getStyles(effectiveTheme);

  return (
    <ScrollView style={styles.container}>
      {post.media.length > 0 && (
        <Image source={{ uri: post.media[0].uri }} style={styles.mediaImage} />
      )}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.date}>
          {new Date(post.createdAt).toLocaleDateString()}
        </Text>
        <Text style={styles.description}>{post.description}</Text>
      </View>
    </ScrollView>
  );
}

// 3. This function creates the StyleSheet based on the current theme
const getStyles = (theme: "light" | "dark") => {
  const isDark = theme === "dark";

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? "#121212" : "#FFFFFF",
    },
    mediaImage: {
      width: "100%",
      height: 250,
    },
    contentContainer: {
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 8,
      color: isDark ? "#FFFFFF" : "#000000",
    },
    date: {
      fontSize: 14,
      color: isDark ? "#A0A0A0" : "#777777",
      marginBottom: 16,
    },
    description: {
      fontSize: 16,
      lineHeight: 24,
      color: isDark ? "#E0E0E0" : "#333333",
    },
  });
};
