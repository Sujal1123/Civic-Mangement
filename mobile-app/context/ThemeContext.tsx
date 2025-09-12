import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { useColorScheme, Appearance } from "react-native";

// ✅ The theme can now be one of three options
export type ThemeOption = "system" | "light" | "dark";

type ThemeContextType = {
  // This is the user's selected preference (e.g., 'system')
  themeOption: ThemeOption;
  // This is the actual theme being applied ('light' or 'dark')
  effectiveTheme: "light" | "dark";
  setThemeOption: (option: ThemeOption) => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const systemTheme = useColorScheme() || "light";
  const [themeOption, setThemeOption] = useState<ThemeOption>("system");
  const [effectiveTheme, setEffectiveTheme] = useState<"light" | "dark">(
    systemTheme
  );

  useEffect(() => {
    // Determine the actual theme to apply
    const currentTheme = themeOption === "system" ? systemTheme : themeOption;
    setEffectiveTheme(currentTheme);
  }, [themeOption, systemTheme]);

  // Listen for system changes to update the theme when in 'automatic' mode
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      if (themeOption === "system") {
        setEffectiveTheme(colorScheme || "light");
      }
    });
    return () => subscription.remove();
  }, [themeOption]);

  return (
    <ThemeContext.Provider
      value={{ themeOption, effectiveTheme, setThemeOption }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
