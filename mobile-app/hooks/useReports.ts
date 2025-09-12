import { useState, useCallback, useEffect } from 'react';
import { useFocusEffect } from 'expo-router';
// Assuming `getReportById` exists alongside `getReports` in your service file
import { getReports, getReportById, Report } from '@/lib/api/reportService';
import { Post } from '@/lib/types';

/**
 * Fetches and manages a list of all reports.
 */
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

// --- NEW HOOK ADDED BELOW ---

/**
 * Fetches a single report by its ID.
 * @param id The ID of the report to fetch.
 */
export function useReportById(id: string | undefined) {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!id) {
            setLoading(false);
            return;
        }

        const fetchReport = async () => {
            // Reset state when a new ID is fetched to avoid showing stale data
            setLoading(true);
            setError(null);

            try {
                const reports: Report[] = await getReportById(id);

                // Format the raw API data into the 'Post' shape your components expect
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

                setPosts(formattedPosts);

            } catch (e) {
                setError(e as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchReport();
    }, [id]); // Rerun the effect if the ID changes

    return { posts, loading, error };
}