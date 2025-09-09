// api.ts
import { UserData } from "./userStorage";

const BASE_URL = "http://localhost:5000/api/auth"; // Replace with your machine's IP

/**
 * Register a new user
 */
export async function register(name: string, email: string, password: string, role = "citizen"): Promise<UserData> {
    const response = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, role }),
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Failed to register");
    }
    return data;
}

/**
 * Login user
 */
export async function login(email: string, password: string): Promise<UserData> {
    const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Failed to login");
    }
    return data;
}

/**
 * Get profile
 */
export async function getProfile(token: string): Promise<UserData> {
    const response = await fetch(`${BASE_URL}/profile`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Failed to fetch profile");
    }
    return data;
}
