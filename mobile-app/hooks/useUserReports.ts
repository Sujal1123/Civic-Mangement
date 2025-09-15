import { useState, useCallback } from 'react';
import { useFocusEffect } from 'expo-router';
import { getMyReports, Report, editMyReport } from '@/lib/api/reportService';
import { Post } from '@/lib/types';
import { Alert } from 'react-native';

export function useUserReports() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    // This function remains the same
    const fetchPosts = useCallback(async () => {
        setLoading(true);
        try {
            const reports: Report[] = await getMyReports();
            const formattedPosts: Post[] = reports.map((report) => ({
                id: report._id,
                title: report.title,
                description: report.description,
                createdAt: report.createdAt,
                media: report.photoUrl
                    ? [{ uri: report.photoUrl, type: 'image', name: 'report-image' }]
                    : [],
            }));
            setPosts(formattedPosts);  ///.reverse() for old to new
        } catch (error) {
            console.error("Error loading posts:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    // ✅ FIX: Call the async function from inside the synchronous callback
    useFocusEffect(
        useCallback(() => {
            fetchPosts();
        }, [fetchPosts])
    );

    // ✅ FIX: Update the post in the local state for a faster UI response
    const updatePost = async (id: string, title: string, description: string) => {
        const updatedReport = await editMyReport(id, title, description);

        if (updatedReport) {
            // Instead of re-fetching, update the specific post in the array
            setPosts(currentPosts =>
                currentPosts.map(post =>
                    post.id === updatedReport._id
                        ? { ...post, title: updatedReport.title, description: updatedReport.description }
                        : post
                )
            );
            Alert.alert("Success", "Report updated successfully!");
        } else {
            Alert.alert("Error", "Failed to update report.");
        }
    };

    return { posts, loading, updatePost };
}