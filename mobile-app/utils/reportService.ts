// utils/reportService.ts
import axios from "axios";
import { loadUser } from "./userStorage";

const API_BASE = "http://localhost:5000/api"; // change if using emulator/device

export type MediaItem = {
    uri: string;
    type: "image" | "video" | "audio";
    name: string;
};

export type Report = {
    _id: string;
    title: string;
    description: string;
    // ✅ FIX: Location is an object
    location?: {
        lat: number;
        lng: number;
        address?: string;
    };
    category?: string;
    photoUrl?: string; // photoUrl is a single string from the backend
    status?: string;
    assignedTo?: any;
    createdBy: any;
    createdAt: string;
};

// Get JWT token from AsyncStorage
async function getToken(): Promise<string | null> {
    try {
        const userdata = await loadUser();
        if (!userdata) return null;
        console.log(`userdata is ${userdata}`)
        //const user = JSON.parse(userdata);
        return userdata.token;
    } catch (error) {
        console.error("Error getting token:", error);
        return null;
    }
}

// Axios instance with Authorization header
async function axiosAuth() {
    const token = await getToken();
    return axios.create({
        baseURL: API_BASE,
        headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
        },
    });
}


// Corrected function to create a report
// utils/reportService.ts

export async function createReport(
    title: string,
    description: string,
    location?: { lat: number, lng: number },
    category?: string,
    media?: MediaItem
): Promise<any | null> {
    try {
        const client = await axiosAuth();
        const formData = new FormData();

        formData.append("title", title);
        formData.append("description", description);
        if (category) {
            formData.append("category", category);
        }

        // Send location as separate fields for the backend to reassemble.
        if (location) {
            formData.append("location[lat]", location.lat.toString());
            formData.append("location[lng]", location.lng.toString());
        }

        // Append the media file if it exists.
        if (media) {
            formData.append("media", {
                uri: media.uri,
                name: media.name,
                type: media.type === "image" ? "image/jpeg" : "video/mp4",
            } as any);
        }

        // ✅ FIX: Add the required "Content-Type" header for FormData.
        const res = await client.post("/reports", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        console.log("Report submitted successfully:", res.data.data);
        return res.data.data;
    } catch (error: any) {
        console.error("Error creating report:", error.response?.data || error.message);
        return null;
    }
}
// Fetch all reports (Admin) or filtered
export async function getReports(category?: string, status?: string): Promise<Report[]> {
    try {
        const client = await axiosAuth();
        const params: any = {};
        if (category) params.category = category;
        if (status) params.status = status;
        const res = await client.get("/reports", { params });
        return res.data.data;
    } catch (error: any) {
        console.error("Error fetching reports:", error.response?.data || error.message);
        return [];
    }
}

// Fetch logged-in user's reports
export async function getMyReports(): Promise<Report[]> {
    try {
        const client = await axiosAuth();
        const res = await client.get("/reports/my");
        return res.data.data;
    } catch (error: any) {
        console.error("Error fetching my reports:", error.response?.data || error.message);
        return [];
    }
}

// Update report status (Admin)
export async function updateReportStatus(reportId: string, status: string, assignedTo?: string): Promise<Report | null> {
    try {
        const client = await axiosAuth();
        const res = await client.put(`/reports/${reportId}`, { status, assignedTo });
        return res.data.data;
    } catch (error: any) {
        console.error("Error updating report:", error.response?.data || error.message);
        return null;
    }
}
// USER: Edit their own report (title and description)
export async function editMyReport(reportId: string, title: string, description: string): Promise<Report | null> {
    try {
        const client = await axiosAuth();
        // Uses the new '/my/:reportId' endpoint
        const res = await client.put(`/reports/my/${reportId}`, { title, description });
        return res.data.data;
    } catch (error: any) {
        console.error("Error editing report:", error.response?.data || error.message);
        return null;
    }
}