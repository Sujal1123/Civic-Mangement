///fix capture logics like picker logic

import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useCreateReportForm } from "@/hooks/useCreateReportForm";
import ReportForm from "@/components/reports/ReportForm";
import MediaPicker from "@/components/reports/MediaPicker";
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

  // 1. Get the effective theme ('light' or 'dark')
  const { effectiveTheme, colors } = useTheme();
  // 2. Pass the theme to the styles function
  const cstyles = getStyles(effectiveTheme);
  const styles = useStylePalette();
  return (
    <View style={[styles.tabcontainer]}>
      <SafeAreaView edges={["top", "bottom"]} style={{ flex: 1 }}>
        <ThemeCycleButton style={{ opacity: 0 }}></ThemeCycleButton>

        <Text style={[styles.title, { textAlign: "center" }]}>
          Create New Report.
        </Text>

        <ReportForm
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
        />
        <View style={[styles.separator, {}]} />
        <Text
          style={[
            styles.subtitle,
            {
              textAlign: "center",
              marginBottom: 10,
            },
          ]}
        >
          Add Photos and Videos
        </Text>
        <MediaPicker
          mediaList={mediaList}
          onPickMedia={pickMedia}
          onCaptureMedia={captureMedia}
        />
        <View style={[styles.separator, {}]} />
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

export const getStyles = (theme: "light" | "dark") => {
  const isDark = theme === "dark";

  const { colors } = useTheme();
  return StyleSheet.create({
    container: {
      flexGrow: 0,
    },
    heading: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
      textAlign: "center",
    },
  });
};
