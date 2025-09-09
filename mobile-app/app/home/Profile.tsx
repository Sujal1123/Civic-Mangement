import {
  editMyReport,
  getMyReports,
  getReports,
  Report,
} from "@/utils/reportService"; // Import the updated Report type
import { loadUser, UserData } from "@/utils/userStorage";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  Alert,
  Button,
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
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
export default function ProfileScreen() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserData | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  // State for handling the edit modal and form
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [currentPost, setCurrentPost] = useState<Post | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

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
          const reports: Report[] = await getMyReports();

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

  // Function to open the edit modal
  const handleEditPress = (post: Post) => {
    setCurrentPost(post);
    setEditTitle(post.title);
    setEditDescription(post.description);
    setEditModalVisible(true);
  };
  // ✅ Function to save the edited post (now fully functional)
  const handleSaveChanges = async () => {
    if (!currentPost) return;

    // Call the service to update the report on the server
    const updatedReport = await editMyReport(
      currentPost.id,
      editTitle,
      editDescription
    );

    if (updatedReport) {
      // Refresh the posts list to show the changes
      setPosts(
        posts.map((p) =>
          p.id === updatedReport._id
            ? {
                ...p,
                title: updatedReport.title,
                description: updatedReport.description,
              }
            : p
        )
      );
      Alert.alert("Success", "Report updated successfully!");
    } else {
      Alert.alert("Error", "Failed to update report.");
    }

    setEditModalVisible(false);
    setCurrentPost(null);
  };

  if (loading) return <Text style={styles.loadingText}>Loading...</Text>;

  // ✅ FIX 3: Your rendering logic for `post.media` will now work correctly.
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        👤 This is the Profile Page with My Posts.
      </Text>
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
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => handleEditPress(post)}
              >
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
      <Modal
        visible={isEditModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Report</Text>
            <TextInput
              style={styles.input}
              value={editTitle}
              onChangeText={setEditTitle}
              placeholder="Report Title"
            />
            <TextInput
              style={[styles.input, { height: 100 }]}
              value={editDescription}
              onChangeText={setEditDescription}
              placeholder="Report Description"
              multiline
            />
            <Button title="Save Changes" onPress={handleSaveChanges} />
            <Button
              title="Cancel"
              onPress={() => setEditModalVisible(false)}
              color="gray"
            />
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
});
