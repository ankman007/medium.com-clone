"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../redux/store";
import Navbar from "./Navbar";
import { LayoutProps } from "../../../constant/types";
import { apiBaseURL } from "../../../constant/api";
import { setUserDetails, clearUserDetails } from "../redux/slices/userSlice";
import { setUserPosts, clearUserPosts } from "../redux/slices/userPostSlice";
import { fetchAllPosts } from "../redux/slices/postsSlice";
import { fetchAllTags } from "../redux/slices/tagsSlice";
import { RootState } from "../redux/store";
import { fetchWithAuth } from "../../../utils";
import { clearTokens } from "../redux/slices/authSlice"; 
import Head from "next/head";

const fetchUserDetail = async (token: string) => {
  try {
    const response = await fetchWithAuth(`${apiBaseURL}/user/profile/`, {
      method: "GET",
      headers: { Authorization: token ? `Bearer ${token}` : "" },
    });
    if (!response.ok) throw new Error("Failed to get user details.");
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
    if (!response.ok) throw new Error("Failed to get user's articles.");
    return await response.json();
  } catch (error) {
    console.error("Error fetching user posts:", error);
    return null;
  }
};

const verifyLogin = async (token: string) => {
  try {
    const response = await fetchWithAuth(`${apiBaseURL}/user/auth/verify/`, {
      method: "GET",
      headers: { Authorization: token ? `Bearer ${token}` : "" },
    });
    if (!response.ok) throw new Error("User session has expired or invalid.");
    return await response.json();
  } catch (error) {
    console.error("User session has expired or invalid:", error);
    return null;
  }
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const access = useSelector((state: RootState) => state.auth.accessToken);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!access) {
        dispatch(clearUserDetails());
        dispatch(clearUserPosts());
        return;
      }

      const isTokenValid = await verifyLogin(access);
      if (!isTokenValid) {
        console.warn("Token invalid, clearing authentication...");
        dispatch(clearTokens()); 
        dispatch(clearUserDetails()); 
        dispatch(clearUserPosts()); 
        return;
      }

      const userDetails = await fetchUserDetail(access);
      if (userDetails) {
        dispatch(
          setUserDetails({
            id: userDetails.id,
            email: userDetails.email,
            name: userDetails.name,
            avatar: userDetails.avatar
          })
        );
      }

      if (userDetails?.id) {
        const userPosts = await fetchUserPosts(access, userDetails.id);
        if (userPosts) {
          dispatch(setUserPosts(userPosts));
        }
      }

      dispatch(fetchAllPosts(access));
      dispatch(fetchAllTags(access));
    };

    fetchUserData();
  }, [dispatch, access]);

  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
