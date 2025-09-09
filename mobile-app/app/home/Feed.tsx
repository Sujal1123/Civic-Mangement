// feed.ts
import { getMyReports, getReports, Report } from "@/utils/reportService"; // Import the updated Report type
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

// Your component's local types (these are fine)
type MediaItem = {
  uri: string;
  type: "image" | "video";
  name: string;
};

type Post = {
  id: string; // Corresponds to _id from the API
  title: string;
  description: string;
  media: MediaItem[]; // Corresponds to photoUrl from the API
  createdAt: string;
};

export default function FeedScreen() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserData | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  // Load user data (this part is fine)
  useFocusEffect(
    useCallback(() => {
      (async () => {
        const saved = await loadUser();
        console.log("Fetched user data");
        if (saved) setUser(saved);
        setLoading(false);
      })();
    }, [])
  );

  // Load posts using the service
  useFocusEffect(
    useCallback(() => {
      const fetchPosts = async () => {
        setLoading(true);
        try {
          // ✅ FIX 1: getReports returns the array directly.
          const reports: Report[] = await getReports();

          if (reports && reports.length > 0) {
            // ✅ FIX 2: Map the API data (Report) to your component's state (Post).
            const formattedPosts: Post[] = reports.map((report) => ({
              id: report._id, // Map _id to id
              title: report.title,
              description: report.description,
              createdAt: report.createdAt,
              // Convert the single photoUrl string into a media array
              media: report.photoUrl
                ? [
                    {
                      uri: report.photoUrl,
                      type: "image",
                      name: report.photoUrl.split("/").pop() || "report-image",
                    },
                  ]
                : [],
            }));
            setPosts(formattedPosts.reverse());
          } else {
            setPosts([]); // Ensure posts are cleared if the response is empty
          }
        } catch (error) {
          console.error("Error loading posts:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchPosts();
    }, [])
  );

  if (loading) return <Text style={styles.loadingText}>Loading...</Text>;

  // ✅ FIX 3: Your rendering logic for `post.media` will now work correctly.
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Home 🏠 {user?.name}</Text>
      <ScrollView contentContainerStyle={styles.containerpost}>
        {posts.length === 0 ? (
          <Text style={styles.noPosts}>No reports available</Text>
        ) : (
          posts.map((post) => (
            <View key={post.id} style={styles.postCard}>
              <Text style={styles.title}>{post.title}</Text>
              <Text style={styles.description}>{post.description}</Text>
              {/* The rest of your rendering code is correct */}
              {post.media.length > 0 && (
                <Image
                  source={{ uri: post.media[0].uri }}
                  style={styles.mediaImage}
                />
              )}
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

// Your styles (I've simplified the card rendering for clarity, but your original styles are fine)
const styles = StyleSheet.create({
  //... your existing styles
  loadingText: {
    flex: 1,
    textAlign: "center",
    textAlignVertical: "center",
  },
  container: {
    flex: 1,
  },
  text: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    padding: 16,
  },
  containerpost: {
    paddingHorizontal: 10,
  },
  noPosts: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 50,
  },
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
