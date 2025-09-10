import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Post } from "@/lib/types";

type ReportCardProps = {
  post: Post;
};

export default function ReportCard({ post }: ReportCardProps) {
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
    </View>
  );
}

const styles = StyleSheet.create({
  // ... styles for postCard, title, description, mediaImage, date

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
});
