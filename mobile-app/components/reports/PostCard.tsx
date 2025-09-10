import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Post } from "@/lib/types";

type PostCardProps = {
  post: Post;
  onEditPress: () => void;
};

export default function PostCard({ post, onEditPress }: PostCardProps) {
  return (
    <View style={styles.postCard}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.description}>{post.description}</Text>
      {post.media.length > 0 && (
        <Image source={{ uri: post.media[0].uri }} style={styles.mediaImage} />
      )}
      <Text style={styles.date}>
        Posted on: {new Date(post.createdAt).toLocaleString()}
      </Text>
      <TouchableOpacity style={styles.editButton} onPress={onEditPress}>
        <Text style={styles.editButtonText}>Edit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  // ... styles for postCard, title, description, mediaImage, date, editButton, editButtonText

  postCard: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 20,
    borderRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    marginBottom: 10,
  },
  mediaImage: {
    width: "100%",
    height: 200, // Adjust height as needed
    borderRadius: 5,
    resizeMode: "cover",
    marginBottom: 10,
  },
  date: {
    fontSize: 12,
    color: "#777",
    textAlign: "right",
  },
  editButton: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#007BFF",
    borderRadius: 5,
    alignSelf: "flex-end",
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
