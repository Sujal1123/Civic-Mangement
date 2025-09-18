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
    location: {
        lat: number;
        lng: number;
        address?: string;
    };
    //category: "pothole" | "streetlight" | "garbage" | "water" | "other" | string;
    category: "pothole" | "streetlight" | "garbage" | "water" | "other";
    media: MediaItem[];  //photo urls
    status?: "submitted" | "in-progress" | "resolved";
    assignedTo?: any;
    createdBy: any;
    createdAt: string;
    updatedAt: string;   // From timestamps
};

// The media item structure used in the app
export type MediaItem = {
    url: string;
    type: "image" | "video" | "audio";
    //name: string;
};
// ✅ Represents a formatted report, ready to be displayed in your UI components
export type Post = {
    id: string;          // Mapped from _id
    title: string;
    description: string;
    media: MediaItem[];  //photo urls and wrong:( Assumes API maps 'url' to 'uri')
    createdAt: string;   // From timestamps
    updatedAt: string;   // From timestamps

    // --- Fields added from reportSchema ---
    location: {
        lat: number;
        lng: number;
        address?: string;
    };

    category: "pothole" | "streetlight" | "garbage" | "water" | "other";

    status: "submitted" | "in-progress" | "resolved";

    createdBy: string; // Holds the user's ID (mongoose.Schema.Types.ObjectId)

    assignedTo?: string; // Holds the assigned user's ID
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
export interface Location {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    mapUrl: string;
}