import React from "react";
import {
  View,
  Button,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import { MediaItem } from "@/lib/types";
import { useStylePalette } from "@/constants/StylePalette";
import { useTheme } from "@/hooks/useTheme";

const { width, height } = Dimensions.get("window");
type MediaPickerProps = {
  mediaList: MediaItem[];
  onPickMedia: () => void;
  onCaptureMedia: () => void;
};

export default function MediaPicker({
  mediaList,
  onPickMedia,
  onCaptureMedia,
}: MediaPickerProps) {
  // 1. Get the effective theme ('light' or 'dark')
  const { effectiveTheme, colors } = useTheme();
  // 2. Pass the theme to the styles function
  //const cstyles = getStyles(effectiveTheme);
  const styles = useStylePalette();
  return (
    <View>
      <View style={cstyles.buttonRow}>
        <TouchableOpacity
          style={[
            styles.simpleButton,
            {
              width: width * 0.4,
              backgroundColor: colors.buttonCreateBg,
            },
          ]}
          onPress={onPickMedia}
        >
          <Text style={[styles.buttonText, { fontSize: 14 }]}>
            Pick from Gallery
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.simpleButton,
            {
              width: width * 0.4,
              backgroundColor: colors.buttonCreateBg,
            },
          ]}
          onPress={onCaptureMedia}
        >
          <Text style={[styles.buttonText, { fontSize: 14 }]}>
            Capture Photo
          </Text>
        </TouchableOpacity>
        {/* You can add a separate function for the camera if needed */}
      </View>

      {mediaList.length > 0 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={cstyles.thumbnailContainer}
        >
          {mediaList.map((media, index) => (
            <TouchableOpacity key={index} style={cstyles.thumbnailWrapper}>
              {media.type === "image" ? (
                <Image source={{ uri: media.uri }} style={cstyles.thumbnail} />
              ) : (
                <View style={cstyles.videoThumbnail}>
                  <Text style={cstyles.videoText}>🎬</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const cstyles = StyleSheet.create({
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  thumbnailContainer: { flex: 1 },
  thumbnailWrapper: {
    width: width * 0.3,
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
