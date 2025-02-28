import { apiBaseURL } from "./constant/api";
import { store } from "@/app/redux/store";
import { clearTokens, setTokens } from "@/app/redux/slices/authSlice";

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

export const capitalize = (str: string): string => {
  if (!str) {
    return "";
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const refreshToken = store.getState().auth.refreshToken || "";
    if (!refreshToken) {
      store.dispatch(clearTokens()); 
      return null;
    }

    const response = await fetch(`${apiBaseURL}/user/token/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!response.ok) {
      console.log("Failed to refresh token.");
    }

    const data = await response.json();
    store.dispatch(setTokens({ accessToken: data.access, refreshToken })); 
    return data.access;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    store.dispatch(clearTokens()); 
    return null;
  }
};

export const fetchWithAuth = async (url: string, options: RequestInit = {}): Promise<Response> => {
  const accessToken = store.getState().auth.accessToken || ""; // Ensure it's a string

  let response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  });

  if (response.status === 401) {
    const newAccessToken = await refreshAccessToken();
    
    if (newAccessToken) {
      store.dispatch(setTokens({ accessToken: newAccessToken, refreshToken: store.getState().auth.refreshToken || "" }));

      response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${newAccessToken}`,
        },
      });
    }
  }

  return response;
};
