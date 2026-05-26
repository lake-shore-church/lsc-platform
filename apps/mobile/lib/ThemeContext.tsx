import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_THEME_ID,
  resolveThemeId,
  THEME_PALETTES,
  type ThemeId,
  type ThemePalette,
} from "@/constants/themes";
import { fetchJson } from "@/lib/api";

const STORAGE_KEY = "lsc-mobile-theme";

type SiteCopy = {
  tagline?: string;
  subTagline?: string;
  heroBody?: string;
  heroCtaText?: string;
  zoomJoinRedirectUrl?: string | null;
  zoomMeetingId?: string;
  zoomPasscode?: string;
};

type ThemeContextValue = {
  themeId: ThemeId;
  colors: ThemePalette;
  setThemeId: (id: ThemeId) => void;
  cmsThemeId: ThemeId;
  siteCopy: SiteCopy;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeIdState] = useState<ThemeId>(DEFAULT_THEME_ID);
  const [cmsThemeId, setCmsThemeId] = useState<ThemeId>(DEFAULT_THEME_ID);
  const [siteCopy, setSiteCopy] = useState<SiteCopy>({});
  useEffect(() => {
    void (async () => {
      try {
        const [stored, config] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEY),
          fetchJson<
            SiteCopy & {
              activeTheme?: string;
              zoomJoinRedirectUrl?: string | null;
              zoomMeetingId?: string;
              zoomPasscode?: string;
            }
          >("/api/mobile/config").catch(() => null),
        ]);
        const cms = resolveThemeId(config?.activeTheme);
        setCmsThemeId(cms);
        setSiteCopy({
          tagline: config?.tagline,
          subTagline: config?.subTagline,
          heroBody: config?.heroBody,
          heroCtaText: config?.heroCtaText,
          zoomJoinRedirectUrl: config?.zoomJoinRedirectUrl,
          zoomMeetingId: config?.zoomMeetingId,
          zoomPasscode: config?.zoomPasscode,
        });
        const picked = stored ? resolveThemeId(stored) : cms;
        setThemeIdState(picked);
      } catch {
        setThemeIdState(DEFAULT_THEME_ID);
      }
    })();
  }, []);

  const setThemeId = useCallback((id: ThemeId) => {
    setThemeIdState(id);
    void AsyncStorage.setItem(STORAGE_KEY, id);
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      themeId,
      colors: THEME_PALETTES[themeId],
      setThemeId,
      cmsThemeId,
      siteCopy,
    }),
    [themeId, setThemeId, cmsThemeId, siteCopy],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    return {
      themeId: DEFAULT_THEME_ID,
      colors: THEME_PALETTES[DEFAULT_THEME_ID],
      setThemeId: () => {},
      cmsThemeId: DEFAULT_THEME_ID,
      siteCopy: {},
    };
  }
  return ctx;
}
