import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useCreateReportForm } from "@/hooks/useCreateReportForm";
import ReportForm from "@/components/reports/ReportForm";
// 1. MediaPicker is no longer imported here
import { SafeAreaView } from "react-native-safe-area-context";
import ThemeCycleButton from "@/components/theming/ThemeCycleButton";
import { useTheme } from "@/hooks/useTheme";
import { useStylePalette } from "@/constants/StylePalette";

const { width, height } = Dimensions.get("window");

export default function CreateScreen() {
  const {
    title,
    setTitle,
    description,
    setDescription,
    mediaList,
    loading,
    pickMedia,
    captureMedia,
    savePost,
  } = useCreateReportForm();

  const { colors } = useTheme();
  const styles = useStylePalette();

  return (
    <View style={[styles.tabcontainer]}>
      <SafeAreaView edges={["top", "bottom"]} style={{ flex: 1 }}>
        <ThemeCycleButton style={{ opacity: 0 }}></ThemeCycleButton>

        <Text style={[styles.title, { textAlign: "center" }]}>
          Create New Report.
        </Text>

        {/* 2. Pass all props to ReportForm */}
        <ReportForm
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          // --- PASS MEDIA PROPS DOWN ---
          mediaList={mediaList}
          onPickMedia={pickMedia}
          onCaptureMedia={captureMedia}
        />

        {/* 3. The MediaPicker and separators are REMOVED from here */}

        <TouchableOpacity
          style={[
            styles.simpleButton,
            {
              backgroundColor: colors.buttonLoginBg,
              alignSelf: "center",
              paddingVertical: 10,
              width: "90%",
            },
          ]}
          onPress={savePost}
          disabled={loading}
        >
          <Text style={[styles.buttonText, { fontSize: 18 }]}>
            {loading ? "Submitting...." : "Submit Report"}
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

// 4. Removed the unused getStyles function
