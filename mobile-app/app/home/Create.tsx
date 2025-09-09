import { createReport } from "@/utils/reportService"; // Your API service
import { loadUser } from "@/utils/userStorage";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import uuid from "react-native-uuid";

type MediaItem = {
  uri: string;
  type: "image" | "video";
  name: string;
};
type UserData = {
  _id: string;
  name: string;
  email: string;
  role: string;
  token: string;
};

let currentPostId = uuid.v4();

export default function CreateScreen() {
  //const { user } = useUser(); // Get logged-in user
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  useEffect(() => {
    (async () => {
      const loaded = await loadUser();
      setUser(loaded);
    })();
  }, []);
  const pickMedia = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission required", "Allow access to media library.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const newMedia = result.assets.map((asset, index) => ({
        uri: asset.uri,
        type: asset.type === "video" ? "video" : "image",
        name: `${currentPostId}-${index + 1}.${
          asset.type === "video" ? "mp4" : "jpg"
        }`,
      }));
      setMediaList((prev) => [...prev, ...newMedia]);
    }
  };

  const takeMedia = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission required", "Allow access to camera.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      const newMedia: MediaItem = {
        uri: asset.uri,
        type: asset.type === "video" ? "video" : "image",
        name: `${currentPostId}-1.${asset.type === "video" ? "mp4" : "jpg"}`,
      };
      setMediaList((prev) => [...prev, newMedia]);
    }
  };

  const savePost = async () => {
    if (!user) {
      Alert.alert("Not logged in", "Please log in to submit a report.");
      return;
    }

    if (!title || !description) {
      Alert.alert("Incomplete data", "Please fill all fields.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", "general"); // you can add category input
      formData.append("location", "Unknown"); // add location input if needed

      mediaList.forEach((media) => {
        formData.append("media", {
          uri: media.uri,
          type: media.type === "video" ? "video/mp4" : "image/jpeg",
          name: media.name,
        } as any);
      });

      const response = await createReport(formData, user.token);
      console.log("Report submitted:", response);
      Alert.alert("Success", "Report submitted successfully!");
      setTitle("");
      setDescription("");
      setMediaList([]);
    } catch (error: any) {
      console.error("Error submitting report:", error);
      Alert.alert(
        "Error",
        error?.response?.data?.message || "Failed to submit report"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Create New Report</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Title"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Enter Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <View style={styles.buttonRow}>
        <Button title="Pick from Gallery" onPress={pickMedia} />
        <Button title="Take Photo/Video" onPress={takeMedia} />
      </View>

      {mediaList.length > 0 && (
        <View style={styles.thumbnailContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {mediaList.map((media, index) => (
              <TouchableOpacity key={index} style={styles.thumbnailWrapper}>
                {media.type === "image" ? (
                  <Image source={{ uri: media.uri }} style={styles.thumbnail} />
                ) : (
                  <View style={styles.videoThumbnail}>
                    <Text style={styles.videoText}>🎬</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      <Button
        title={loading ? "Submitting..." : "Submit Report"}
        onPress={savePost}
        disabled={loading}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  heading: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  thumbnailContainer: { marginBottom: 10 },
  thumbnailWrapper: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 6,
    overflow: "hidden",
  },
  thumbnail: { width: "100%", height: "100%", resizeMode: "cover" },
  videoThumbnail: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  videoText: { color: "#fff", fontSize: 20, fontWeight: "bold" },
});
