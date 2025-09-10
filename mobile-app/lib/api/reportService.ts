import apiClient from './apiClient';
import { Report, MediaItem } from '../types';

export async function createReport(
    title: string,
    description: string,
    location?: { lat: number, lng: number },
    category?: string,
    media?: MediaItem
): Promise<Report | null> {
    try {
        const formData = new FormData();

        // Append text fields
        formData.append("title", title);
        formData.append("description", description);
        if (category) {
            formData.append("category", category);
        }

        // Append location as separate fields
        if (location) {
            formData.append("location[lat]", location.lat.toString());
            formData.append("location[lng]", location.lng.toString());
        }

        // Append media file if it exists
        if (media) {
            formData.append("media", {
                uri: media.uri,
                name: media.name,
                type: media.type === "image" ? "image/jpeg" : "video/mp4",
            } as any);
        }

        const res = await apiClient.post("/reports", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        console.log("Report submitted successfully:", res.data.data);
        return res.data.data;
    } catch (error: any) {
        console.error("Error creating report:", error.response?.data || error.message);
        return null;
    }
}

export async function getReports(category?: string, status?: string): Promise<Report[]> {
    try {
        const res = await apiClient.get("/reports", { params: { category, status } });
        return res.data.data;
    } catch (error: any) {
        console.error("Error fetching reports:", error.response?.data || error.message);
        return [];
    }
}

// ... getMyReports, updateReportStatus, editMyReport functions updated similarly

export async function getMyReports(): Promise<Report[]> {
    try {
        // ✅ Uses the central apiClient directly
        const res = await apiClient.get("/reports/my");
        return res.data.data;
    } catch (error: any) {
        console.error("Error fetching my reports:", error.response?.data || error.message);
        return [];
    }
}

/**
 * ADMIN: Update a report's status and/or assigned user.
 */
export async function updateReportStatus(reportId: string, status?: string, assignedTo?: string): Promise<Report | null> {
    try {
        const payload: { status?: string; assignedTo?: string } = {};
        if (status) payload.status = status;
        if (assignedTo) payload.assignedTo = assignedTo;

        // ✅ Uses the central apiClient directly
        const res = await apiClient.put(`/reports/${reportId}`, payload);
        return res.data.data;
    } catch (error: any) {
        console.error("Error updating report:", error.response?.data || error.message);
        return null;
    }
}


/**
 * USER: Edit the title and description of their own report.
 */
export async function editMyReport(reportId: string, title: string, description: string): Promise<Report | null> {
    try {
        // ✅ Uses the central apiClient directly
        const res = await apiClient.put(`/reports/my/${reportId}`, { title, description });
        return res.data.data;
    } catch (error: any) {
        console.error("Error editing report:", error.response?.data || error.message);
        return null;
    }
}

export { Report };
