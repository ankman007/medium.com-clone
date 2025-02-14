"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faPen,
  faUser,
  faBookmark,
  faCog,
  faQuestionCircle,
  faSignOutAlt,

} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  // Check if user is logged in by looking for access token in localStorage
  const checkLoginStatus = () => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token); // Set logged-in status based on token presence
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
  
    if (!refreshToken) {
      console.log("No refresh token found.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:8000/user/logout/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });
  
      // Check if the response is okay
      if (!response.ok) {
        // If the response isn't okay, check if it has a body
        const errorResponse = await response.text(); // Use text() to avoid JSON parsing error
        console.log("Logout error:", errorResponse);
        throw new Error(errorResponse || "Logout failed. Please try again.");
      }
  
      // If the response is okay and has content, parse it
      const data = await response.json();
      console.log("Logout success:", data.msg);
  
      // Clear localStorage and update state
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setIsLoggedIn(false);
  
      // Redirect to the login page after logout
      router.push("/login");
    } catch (error) {
      console.log("Logout error:", error);
    }
  };
  
  

  // Call checkLoginStatus whenever component is rendered
  React.useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <nav className="w-full bg-white py-2 px-4 flex justify-between items-center">
      <div className="flex items-center space-x-6">
        <div className="text-2xl font-bold text-gray-800 cursor-pointer">
          DevFlow
        </div>
        {isLoggedIn && (
          <div className="relative">
            <input
              type="text"
              className="rounded-full px-4 py-2 w-64 bg-gray-100 focus:outline-none focus:bg-gray-200 placeholder-gray-500"
              placeholder="Search"
            />
          </div>
        )}
      </div>

      <div className="flex items-center space-x-6">
        {isLoggedIn ? (
          <>
            <button className="flex items-center space-x-2 bg-black text-white rounded-full py-2 px-4 hover:bg-gray-800">
              <FontAwesomeIcon icon={faPen} />
              <span>Write</span>
            </button>

            <div className="relative cursor-pointer">
              <FontAwesomeIcon icon={faBell} className="text-gray-600" />
            </div>

            <div className="relative">
              <Image
                src="/dummy-profile-1.jpg"
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full object-cover cursor-pointer"
                onClick={toggleDropdown}
              />

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2">
                  <a
                    href="#"
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    <FontAwesomeIcon icon={faUser} className="mr-2" /> Profile
                  </a>
                  <a
                    href="#"
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    <FontAwesomeIcon icon={faBookmark} className="mr-2" /> Bookmarks
                  </a>
                  <a
                    href="#"
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    <FontAwesomeIcon icon={faCog} className="mr-2" /> Settings
                  </a>
                  <a
                    href="#"
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    <FontAwesomeIcon icon={faQuestionCircle} className="mr-2" /> Help
                  </a>
                  <hr className="my-2" />
                  <a
                    href="#"
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={handleLogout} // Call logout function on click
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" /> Sign Out
                  </a>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex space-x-6">
            <Link href="/login" className="text-black font-bold hover:underline">
              Log In
            </Link>
            <Link href="/sign-up" className="text-black font-bold hover:underline">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
