import React from "react";
import {
  View,
  Button,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
} from "react-native";
import { MediaItem } from "@/lib/types";

type MediaPickerProps = {
  mediaList: MediaItem[];
  onPickMedia: () => void;
};

export default function MediaPicker({
  mediaList,
  onPickMedia,
}: MediaPickerProps) {
  return (
    <View>
      <View style={styles.buttonRow}>
        <Button title="Pick from Gallery" onPress={onPickMedia} />
        {/* You can add a separate function for the camera if needed */}
      </View>

      {mediaList.length > 0 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.thumbnailContainer}
        >
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
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  thumbnailContainer: { marginBottom: 20 },
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
