import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useUserData } from "@/hooks/useUserData";
import { useUserReports } from "@/hooks/useUserReports";
import { Post } from "@/lib/types";
import PostCard from "@/components/reports/PostCard";
import EditPostModal from "@/components/reports/EditPostModal";

export default function ProfileScreen() {
  const user = useUserData();
  const { posts, loading, updatePost } = useUserReports();

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
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>👤 My Submitted Reports</Text>
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
          <Text style={styles.noPosts}>No reports available</Text>
        )}
      </ScrollView>

      <EditPostModal
        visible={isEditModalVisible}
        onClose={() => setEditModalVisible(false)}
        postToEdit={currentPost}
        onSave={handleSave}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  // ... only the styles needed for this screen: container, text, loadingText, noPosts
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
