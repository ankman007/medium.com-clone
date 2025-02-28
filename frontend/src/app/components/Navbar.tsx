"use client";

import React, { useState, useEffect, useRef } from "react";
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
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { clearTokens } from "../redux/slices/authSlice";
import { clearUserPosts } from "../redux/slices/userPostSlice";
import { clearUserDetails } from "../redux/slices/userSlice";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();

  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const isLoggedIn = !!accessToken;

  useEffect(() => {
    if (accessToken) {
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [accessToken]);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(clearTokens());
    dispatch(clearUserDetails());
    dispatch(clearUserPosts());
    setIsDropdownOpen(false);
  };

  // Handle clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownOpen]);

  if (isLoading) {
    return <div></div>;
  }

  return (
    <nav className="w-full bg-white py-2 px-4 flex justify-between items-center">
      <div className="flex items-center space-x-6">
        <Link
          href={"/"}
          className="text-2xl font-bold text-gray-800 cursor-pointer hover:text-black focus:text-black hover:no-underline focus:no-underline"
        >
          DevFlow
        </Link>
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
              <Link
                href="/new-post"
                className="text-inherit no-underline flex items-center gap-2 hover:text-white focus:text-white hover:no-underline focus:no-underline"
              >
                <FontAwesomeIcon icon={faPen} />
                <span>Write</span>
              </Link>
            </button>

            <div className="relative cursor-pointer">
              <FontAwesomeIcon icon={faBell} className="text-gray-600" />
            </div>

            <div className="relative" ref={dropdownRef}>
              <Image
                src="/dummy-profile-1.jpg"
                alt="Profile Picture"
                width={40}
                height={40}
                className="rounded-full object-cover cursor-pointer"
                onClick={toggleDropdown}
                unoptimized
              />

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2">
                  <button
                    className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    <Link href={"/profile"}>
                    <FontAwesomeIcon icon={faUser} className="mr-2" /> Profile
                    </Link>
                  </button>
                  <a
                    href="#"
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    <FontAwesomeIcon icon={faBookmark} className="mr-2" />{" "}
                    Bookmarks
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
                    <FontAwesomeIcon icon={faQuestionCircle} className="mr-2" />{" "}
                    Help
                  </a>
                  <hr className="my-2" />
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    <Link href={"/"}>
                      <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />{" "}
                      Sign Out
                    </Link>
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex space-x-6">
            <Link
              href="/login"
              className="flex items-center space-x-2 bg-black text-white rounded-full py-2 px-4 no-underline hover:text-white hover:bg-gray-800 focus:text-white hover:no-underline focus:no-underline"
            >
              Log In
            </Link>
            <Link
              href="/sign-up"
              className="flex items-center space-x-2 bg-black text-white rounded-full py-2 px-4 no-underline hover:text-white hover:bg-gray-800 focus:text-white hover:no-underline focus:no-underline"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
