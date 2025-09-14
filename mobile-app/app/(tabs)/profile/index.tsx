import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useUserData } from "@/hooks/useUserData";
import { useUserReports } from "@/hooks/useUserReports";
import { Post } from "@/lib/types";
import PostCard from "@/components/reports/PostCard";
import EditPostModal from "@/components/reports/EditPostModal";
import ThemeCycleButton from "@/components/theming/ThemeCycleButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/useTheme";
import { useStylePalette } from "@/constants/StylePalette";

export default function ProfileScreen() {
  const user = useUserData();
  const { posts, loading, updatePost } = useUserReports();

  // 1. Get the effective theme ('light' or 'dark')
  const { effectiveTheme, colors } = useTheme();
  // 2. Pass the theme to the styles function
  const cstyles = getStyles(effectiveTheme);
  const styles = useStylePalette();

  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [currentPost, setCurrentPost] = useState<Post | null>(null);

  const handleEditPress = (post: Post) => {
    setCurrentPost(post);
    setEditModalVisible(true);
  };

  const handleSave = (id: string, title: string, description: string) => {
    updatePost(id, title, description);
    setEditModalVisible(false);
  };

  if (loading) {
    return (
      <View style={styles.tabcontainer}>
        <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
          <ThemeCycleButton></ThemeCycleButton>
          <Text style={cstyles.loadingText}>Loading...</Text>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View style={styles.tabcontainer}>
      <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
        <ThemeCycleButton></ThemeCycleButton>
        <Text style={styles.title}>👤 My Submitted Reports</Text>
        <ScrollView>
          {posts.length > 0 ? (
            posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onEditPress={() => handleEditPress(post)}
              />
            ))
          ) : (
            <Text style={styles.subtitle}>No reports available</Text>
          )}
        </ScrollView>

        <EditPostModal
          visible={isEditModalVisible}
          onClose={() => setEditModalVisible(false)}
          postToEdit={currentPost}
          onSave={handleSave}
        />
      </SafeAreaView>
    </View>
  );
}

export const getStyles = (theme: "light" | "dark") => {
  const isDark = theme === "dark";

  const { colors } = useTheme();
  return StyleSheet.create({
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
    noPosts: {
      textAlign: "center",
      fontSize: 16,
      marginTop: 50,
    },
  });
};
