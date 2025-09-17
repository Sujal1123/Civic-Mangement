import { ViewStyle } from "react-native";

// The user data structure from your API
export type UserData = {
    _id: string;
    name: string;
    email: string;
    role: string;
    token: string;
};

// The report data structure from your API
export type Report = {
    _id: string;
    title: string;
    description: string;
    location?: {
        lat: number;
        lng: number;
        address?: string;
    };
    category?: string;
    photoUrl?: string;
    status?: string;
    assignedTo?: any;
    createdBy: any;
    createdAt: string;
};

// The media item structure used in the app
export type MediaItem = {
    uri: string;
    type: "image" | "video" | "audio";
    name: string;
};
// ✅ Represents a formatted report, ready to be displayed in your UI components
export type Post = {
    id: string; // Mapped from the API's _id
    title: string;
    description: string;
    media: MediaItem[]; // Mapped from the API's single photoUrl
    createdAt: string;
};

export type ThemeCycleButtonProps = {
    style?: ViewStyle;
    size?: number;
    color?: string;
};
export interface TranslationStrings {
    welcome: string;
    submitReport: string;
    myReports: string;
    profile: {
        title: string;
        role: string;
        totalReports: string;
    };
}