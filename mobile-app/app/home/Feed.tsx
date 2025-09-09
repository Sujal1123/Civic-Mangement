import { getMyReports } from "@/utils/reportService"; // Import the service
import { loadUser, UserData } from "@/utils/userStorage";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { width } = Dimensions.get("screen");

// Types
type MediaItem = {
  uri: string;
  type: "image" | "video";
  name: string;
};

type Post = {
  id: string;
  title: string;
  description: string;
  media: MediaItem[];
  createdAt: string;
};

export default function FeedScreen() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserData | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  // Load user data
  useFocusEffect(
    useCallback(() => {
      (async () => {
        const saved = await loadUser();
        console.log("Fetched user data");
        if (saved) {
          setUser(saved);
        }
        setLoading(false);
      })();
    }, [])
  );

  // Load posts using the service
  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          setLoading(true);
          const response = await getMyReports(); // Call the service
          if (response.data && response.data.data) {
            setPosts(response.data.data.reverse()); // Assuming response structure
          }
        } catch (error) {
          console.error("Error loading posts:", error);
        } finally {
          setLoading(false);
        }
      })();
    }, [])
  );

  if (loading) return <Text style={styles.loadingText}>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Home 🏠 {user?.name}</Text>
      <ScrollView contentContainerStyle={styles.containerpost}>
        {posts.length === 0 ? (
          <Text style={styles.noPosts}>No posts available</Text>
        ) : (
          posts.map((post) => (
            <View key={post.id} style={styles.postCard}>
              <Text style={styles.title}>{post.title}</Text>
              <Text style={styles.description}>{post.description}</Text>
              <Text style={styles.info}>Post ID: {post.id}</Text>
              <View style={styles.info}>
                <Text style={{ fontWeight: "bold" }}>Media Files:</Text>
                {post.media.map((media, index) => (
                  <Text key={index} style={styles.mediaName}>
                    {media.name}
                  </Text>
                ))}
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.mediaScroll}
              >
                {post.media.map((media, index) => (
                  <View key={index} style={styles.mediaWrapper}>
                    {media.type === "image" ? (
                      <Image
                        source={{ uri: media.uri }}
                        style={styles.mediaImage}
                      />
                    ) : (
                      <View style={styles.videoPlaceholder}>
                        <Text style={styles.videoText}>🎬 Video</Text>
                      </View>
                    )}
                  </View>
                ))}
              </ScrollView>
              <Text style={styles.date}>
                Posted on: {new Date(post.createdAt).toLocaleString()}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  text: { fontSize: 22, fontWeight: "bold", textAlign: "center" },
  containerpost: {
    padding: 20,
    width: width,
  },
  noPosts: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 50,
  },
  postCard: {
    width: "95%",
    alignSelf: "center",
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 20,
    borderRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    marginBottom: 10,
  },
  info: {
    fontSize: 10,
    marginVertical: 5,
  },
  mediaName: {
    fontSize: 10,
    color: "#555",
    marginLeft: 10,
  },
  mediaScroll: {
    marginBottom: 10,
  },
  mediaWrapper: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 5,
    overflow: "hidden",
  },
  mediaImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  videoPlaceholder: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  videoText: {
    color: "#fff",
    fontSize: 16,
  },
  date: {
    fontSize: 12,
    color: "#777",
    marginTop: 5,
    textAlign: "right",
  },
});
