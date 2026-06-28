import { useGoogleLogin } from "@react-oauth/google";
import { useState, useEffect } from "react";
import { Navbar } from "./Navbar";
import supabase from "./supabase-client";

export function Login({ setUserProfile, setSession }) {
  const [user, setUser] = useState(null);

  const googleAuth = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (!user) return;

    const login = async () => {
      try {
        const res = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          },
        );
        const userData = await res.json();
        console.log(userData);
        const { data: existingProfile, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", userData.id)
          .maybeSingle();

        if (error) {
          console.log("fetch profile error:", error);
          return;
        }
        if (existingProfile) {
          // login handler
          setSession(userData.id);
          setUserProfile(existingProfile);
        } else {
          // no account handler
          const { data } = await supabase
            .from("profiles")
            .insert([
              {
                id: userData.id,
                name: userData.name,
                avatar: userData.picture,
                watched_movies: [],
              },
            ])
            .select()
            .maybeSingle();
          setSession(userData.id);
          setUserProfile(data);
        }
      } catch (err) {
        console.log("error:", err);
      }
    };
    login();
  }, [user, setSession, setUserProfile]);

  return (
    <div>
      <Navbar>
        <h1>Login to access webpage</h1>
        <button className="btn-switch" onClick={() => googleAuth()}>
          Login
        </button>
      </Navbar>
    </div>
  );
}
