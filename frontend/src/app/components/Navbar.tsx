"use client";

import React, { useState, useEffect } from "react";
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

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    dispatch(clearTokens());
    setIsDropdownOpen(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <nav className="w-full bg-white py-2 px-4 flex justify-between items-center">
      <div className="flex items-center space-x-6">
        <Link href={"/"} className="text-2xl font-bold text-gray-800 cursor-pointer">
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
              <FontAwesomeIcon icon={faPen} />
              <span>Write</span>
            </button>

            <div className="relative cursor-pointer">
              <FontAwesomeIcon icon={faBell} className="text-gray-600" />
            </div>

            <div className="relative">
              <Image
                src="/dummy-profile-1.jpg"
                alt="Description of the image"
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
                  <a
                    href="#"
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />{" "}
                    Sign Out
                  </a>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex space-x-6">
            <Link
                href="/login"
                className="flex items-center space-x-2 bg-black text-white rounded-full py-2 px-4 no-underline hover:text-white hover:bg-gray-800"            >
              Log In
            </Link>
            <Link
              href="/sign-up"
              className="flex items-center space-x-2 bg-black text-white rounded-full py-2 px-4 no-underline hover:text-white hover:bg-gray-800"
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
