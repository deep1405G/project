const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
let googleScriptPromise = null;

function loadGoogleIdentityScript() {
  if (window.google?.accounts?.oauth2) return Promise.resolve();
  if (googleScriptPromise) return googleScriptPromise;
  googleScriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("Failed to load Google sign-in script")), {
        once: true,
      });
      return;
    }
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Google sign-in script"));
    document.head.appendChild(script);
  });
  return googleScriptPromise;
}

function requestGoogleUserProfile() {
  return new Promise((resolve, reject) => {
    if (!GOOGLE_CLIENT_ID) {
      reject(new Error("Google sign-in is not configured. Add REACT_APP_GOOGLE_CLIENT_ID to your .env file."));
      return;
    }
    if (!window.google?.accounts?.oauth2) {
      reject(new Error("Google sign-in is unavailable right now. Please refresh and try again."));
      return;
    }
    const client = window.google.accounts.oauth2.initTokenClient({
      client_id: GOOGLE_CLIENT_ID,
      scope: "openid email profile",
      callback: async (tokenResponse) => {
        if (tokenResponse?.error) {
          reject(new Error(tokenResponse.error));
          return;
        }
        try {
          const profileRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
          });
          if (!profileRes.ok) throw new Error("Failed to fetch Google profile");
          const profile = await profileRes.json();
          resolve(profile);
        } catch (err) {
          reject(err);
        }
      },
    });
    client.requestAccessToken({ prompt: "select_account" });
  });
}

export async function loginWithGoogle(setUser, setErr, setLoading) {
  setErr("");
  setLoading(true);
  try {
    await loadGoogleIdentityScript();
    const profile = await requestGoogleUserProfile();
    setUser({
      name: profile.name || profile.given_name || "buddy",
      email: profile.email || "",
      avatar: "🌐",
      google: true,
      picture: profile.picture,
      sub: profile.sub,
    });
  } catch (err) {
    setErr(err?.message || "Google sign-in failed. Please try again.");
  } finally {
    setLoading(false);
  }
}
