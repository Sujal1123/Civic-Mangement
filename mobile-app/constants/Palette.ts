/**
 * This file contains the raw, non-themed color values for the entire application.
 * These are the foundational "crayons" used to build the themed color palettes.
 */
/*
export const Palette = (theme: "light" | "dark") => {

    const isDark = theme === "dark";
    // Brand Colors
    // brandGreen: "#ffffffab",


    };

    /*
        // Semantic Colors
        //Navigation Button colors
    
        darkproceedbuttoncolor: "#4CAF50",
        lightproceedbuttoncolor: "#4CAF50",
        darkcreatebuttoncolor: "#459cff",
        lightcreatebuttoncolor: "#007BFF",
        //Theme button colors
        darkthemebuttoncolor: "#202020ff",
        darkthemebuttonborder: "#f3ffefff",
        lighttheembuttoncolor: "#f3ffefff",
        lighttheembuttonborder: "#202020ff",

};*/
/**
 * This function generates a theme-aware color object.
 */
export const Palette = (theme: "light" | "dark") => {
    const isDark = theme === "dark";

    //commons
    const colors = {
        // General
        background: isDark ? "#000000ff" : "#d2fdd4ff",
        tabBackground: isDark ? "#000000ff" : "#ecffefff",
        text: isDark ? "#ECEDEE" : "#11181C",
        title: isDark ? "#FFFFFF" : "#333333",
        subtitle: isDark ? "#FFFFFF" : "#333333",
        subbackground: isDark ? "#ffffff04" : "#d2fdd4ff",
        // Inputs
        inputBorder: isDark ? "#555555" : "#ccc",
        inputText: isDark ? "#FFFFFF" : "#000000",
        Inputbackground: isDark ? "#ffffff69" : "#ffffffff",
        PlaceholderText: isDark ? "#FFFFFF" : "#000000",

        // Semantic Colors
        textAdmin: isDark ? "#FF6B6B" : "#D90000",
        textSuccess: isDark ? "#69DB7C" : "#006400",

        // Buttons
        buttonLoginBg: isDark ? "#4CAF50" : "#4CAF50",
        buttonCreateBg: isDark ? "#459cff" : "#007BFF",
        buttonText: "#fafcffff",
        proceedbuttoncolor: isDark ? "#4CAF50" : "#4CAF50",

        // Add your theme button colors here from the comments
        themeButton: isDark ? "#202020ff" : "#f3ffefff",
        themeBorder: isDark ? "#f3ffefff" : "#202020ff",

        //gradients
        welcomeGradientEnd: isDark ? "#000000ff" : "#d2fdd4ff",

        //Home Nav Bar    // --- Tab Bar Colors ---
        card: isDark ? "#212529" : "#F8F9FA",
        border: isDark ? "#343A40" : "#DEE2E6",
        tabLabelActive: isDark ? "#FFFFFF" : "#000000",
        tabLabelInactive: isDark ? "#9cad97ff" : "#3a3f39ff",
        tabIconActive: isDark ? "#007BFF" : "#007BFF",
        tabIconInactive: isDark ? "#495057" : "#ADB5BD",

        //Card Colors
        //Card1
        cardBackground: isDark ? "#3f3f3fff" : "#d9fadbff",
        cardTitle: isDark ? "#FFFFFF" : "#000000",
        CardDescription: isDark ? "#d6d6d6ff" : "#1f1f1fff",
        cardDate: isDark ? "#84e6ffff" : "#121f22ff",

    };

    // ✅ YOU MUST RETURN THE OBJECT
    return colors;
};

// Also export the TypeScript type of our color object
export type AppColorPalette = ReturnType<typeof Palette>;