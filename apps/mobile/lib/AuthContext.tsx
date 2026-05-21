import type { Session, User } from "@supabase/supabase-js";
import type { UserRole } from "@repo/db/types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getMobileSupabase } from "./supabase";

type Profile = {
  id: string;
  full_name: string | null;
  email: string | null;
  role: UserRole;
};

type AuthContextValue = {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  role: UserRole | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshProfile = useCallback(async () => {
    const supabase = getMobileSupabase();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setProfile(null);
      return;
    }
    const { data } = await supabase
      .from("profiles")
      .select("id, full_name, email, role")
      .eq("id", user.id)
      .maybeSingle();
    setProfile(data ?? null);
  }, []);

  useEffect(() => {
    const supabase = getMobileSupabase();

    void supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setIsLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session?.user) {
      void refreshProfile();
    } else {
      setProfile(null);
    }
  }, [session, refreshProfile]);

  const signOut = useCallback(async () => {
    const supabase = getMobileSupabase();
    await supabase.auth.signOut();
    setProfile(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      user: session?.user ?? null,
      profile,
      role: profile?.role ?? null,
      isLoading,
      signOut,
      refreshProfile,
    }),
    [session, profile, isLoading, signOut, refreshProfile],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
