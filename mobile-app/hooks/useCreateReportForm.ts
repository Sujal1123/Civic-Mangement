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
        let result = await ImagePicker.launchImageLibraryAsync({
            // To fix your warning, use 'MediaTypeOptions'
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            allowsMultipleSelection: true, // Make sure this is true
            quality: 1,
        });

        if (!result.canceled && result.assets) {
            // 1. 'result.assets' is an array. We must map over it.
            const newItems = result.assets.map(asset => ({
                uri: asset.uri,
                name: asset.fileName || `media-${Date.now()}`,
                type: asset.type || 'image', // 'image' or 'video'
            }));

            // 2. Update the state with the new items
            setMediaList(prevList => [...prevList, ...newItems]);
        }
    };
    const captureMedia = async () => {
        // Request camera permissions first
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera permissions to make this work!');
            return;
        }

        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled && result.assets) {
            // 1. 'result.assets' is an array (usually with 1 item for camera)
            const newItems = result.assets.map(asset => ({
                uri: asset.uri,
                name: asset.fileName || `camera-${Date.now()}`,
                type: asset.type || 'image',
            }));

            // 2. Update the state
            setMediaList(prevList => [...prevList, ...newItems]);
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
                mediaList // Pass the first media item
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
        captureMedia,
        savePost,
    };
}