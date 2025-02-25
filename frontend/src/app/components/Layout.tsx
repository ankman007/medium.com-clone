"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../redux/store";
import Navbar from "./Navbar";
import { LayoutProps } from "../../../constant/types";
import { apiBaseURL } from "../../../constant/api";
import { setUserDetails } from "../redux/slices/userSlice";
import { setUserPosts } from "../redux/slices/userPostSlice";
import { fetchAllPosts } from "../redux/slices/postsSlice";
import { fetchAllTags } from "../redux/slices/tagsSlice";
import { RootState } from "../redux/store";
import { fetchWithAuth } from "../../../utils";

const fetchUserDetail = async (token: string) => {
  try {
    const response = await fetchWithAuth(`${apiBaseURL}/user/profile/`, {
      method: "GET",
      headers: { Authorization: token ? `Bearer ${token}` : "" },
    });
    if (!response.ok) {
      throw new Error("Failed to get user details.");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching user details:", error);
    return null;
  }
};

const fetchUserPosts = async (token: string, userId: string) => {
  try {
    const response = await fetchWithAuth(`${apiBaseURL}/articles/users/${userId}/`, {
      method: "GET",
      headers: { Authorization: token ? `Bearer ${token}` : "" },
    });
    if (!response.ok) {
      throw new Error("Failed to get user's articles.");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching user posts:", error);
    return null;
  }
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector((state: RootState) => state.user.id);
  const access = useSelector((state: RootState) => state.auth.accessToken);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!access) return;

      const userDetails = await fetchUserDetail(access);
      if (userDetails) {
        dispatch(
          setUserDetails({
            id: userDetails.id,
            email: userDetails.email,
            name: userDetails.name,
          })
        );
      }

      if (userId) {
        const userPosts = await fetchUserPosts(access, userId);
        if (userPosts) {
          dispatch(setUserPosts(userPosts));
        }
      }

      dispatch(fetchAllPosts(access));
      dispatch(fetchAllTags(access));
    };

    fetchUserData();
  }, [dispatch, access, userId]);

  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
