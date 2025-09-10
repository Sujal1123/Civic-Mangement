import { useState, useCallback } from 'react';
import { useFocusEffect } from 'expo-router';
import { getReports, Report } from '@/lib/api/reportService';
import { Post } from '@/lib/types';

export function useReports() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPosts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const reports: Report[] = await getReports();
            const formattedPosts: Post[] = reports.map((report) => ({
                id: report._id,
                title: report.title,
                description: report.description,
                createdAt: report.createdAt,
                // Convert the single photoUrl string into a media array
                media: report.photoUrl
                    ? [{ uri: report.photoUrl, type: 'image', name: report.photoUrl.split('/').pop() || 'report-image' }]
                    : [],
            }));
            setPosts(formattedPosts.reverse());
        } catch (err: any) {
            console.error("Error loading posts:", err);
            setError("Failed to load reports.");
        } finally {
            setLoading(false);
        }
    }, []);

    // Re-fetch posts whenever the screen comes into focus
    useFocusEffect(
        useCallback(() => {
            fetchPosts();
        }, [fetchPosts])
    );

    return { posts, loading, error, refetch: fetchPosts };
}