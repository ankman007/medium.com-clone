export const getRandomImage = (imageArray: string[]) => {
    const randomIndex = Math.floor(Math.random() * imageArray.length);
    return imageArray[randomIndex];
  }
  
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

import { apiBaseURL } from "./constant/api";
import { store } from "@/app/redux/store";
import { setAccessToken } from "@/app/redux/slices/authSlice"; // Redux action to update token

export const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const refreshToken = store.getState().auth.refreshToken;
    if (!refreshToken) return null;

    const response = await fetch(`${apiBaseURL}/user/token/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!response.ok) {
      throw new Error("Failed to refresh token.");
    }

    const data = await response.json();
    store.dispatch(setAccessToken(data.access)); // Update Redux state
    return data.access;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return null;
  }
};

export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  let accessToken = store.getState().auth.accessToken;

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  });

  if (response.status === 401) {
    // If unauthorized, attempt to refresh the token
    const newAccessToken = await refreshAccessToken();
    if (newAccessToken) {
      return fetch(url, {
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
