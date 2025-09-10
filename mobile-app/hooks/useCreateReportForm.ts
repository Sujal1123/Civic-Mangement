// hooks/useCreateReportForm.ts
import { useState } from 'react';
import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import uuid from 'react-native-uuid';
import { createReport } from '@/lib/api/reportService';
import { MediaItem } from '@/lib/types';

export function useCreateReportForm() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [mediaList, setMediaList] = useState<MediaItem[]>([]);
    const [loading, setLoading] = useState(false);

    const pickMedia = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
            Alert.alert("Permission required", "Allow access to media library.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsMultipleSelection: true,
            quality: 1,
        });

        if (!result.canceled && result.assets.length > 0) {
            const newMedia = result.assets.map((asset, index) => ({
                uri: asset.uri,
                type: asset.type === "video" ? "video" : "image",
                name: `${uuid.v4()}-${index}.${asset.type === "video" ? "mp4" : "jpg"}`,
            }));
            setMediaList((prev) => [...prev, ...newMedia]);
        }
    };

    const savePost = async () => {
        if (!title || !description) {
            Alert.alert("Incomplete data", "Please fill all fields.");
            return false;
        }
        setLoading(true);
        try {
            const response = await createReport(
                title,
                description,
                // Replace with actual coordinates from a location picker
                { lat: 21.0077, lng: 75.5626 }, // Example: Jalgaon coordinates
                // ✅ Use a valid category from your schema's enum list
                "pothole",
                mediaList[0] // Pass the first media item
            );
            if (response) {
                Alert.alert("Success", "Report submitted successfully!");
                setTitle("");
                setDescription("");
                setMediaList([]);
                return true;
            } else {
                Alert.alert("Error", "Failed to submit report.");
                return false;
            }
        } catch (error) {
            console.error("Error submitting report:", error);
            Alert.alert("Error", "An unexpected error occurred.");
            return false;
        } finally {
            setLoading(false);
        }
    };

    return {
        title,
        setTitle,
        description,
        setDescription,
        mediaList,
        loading,
        pickMedia,
        savePost,
    };
}