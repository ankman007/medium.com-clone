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

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="w-full bg-white py-2 px-4 flex justify-between items-center">
      {/* Left section - Logo and Search */}
      <div className="flex items-center space-x-6">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-800 cursor-pointer">
          Medium
        </div>

        {/* Search */}
        <div className="relative">
          <input
            type="text"
            className="rounded-full px-4 py-2 w-64 bg-gray-100 focus:outline-none focus:bg-gray-200 placeholder-gray-500"
            placeholder="Search"
          />
        </div>
      </div>

      {/* Right section - Write, Notifications, Profile */}
      <div className="flex items-center space-x-6">
        {/* Write button */}
        <button className="flex items-center space-x-2 bg-black text-white rounded-full py-2 px-4 hover:bg-gray-800">
          <FontAwesomeIcon icon={faPen} />
          <span>Write</span>
        </button>

        {/* Notifications Icon */}
        <div className="relative cursor-pointer">
          <FontAwesomeIcon icon={faBell} className="text-gray-600" />
        </div>

        {/* Profile Section */}
        <div className="relative">
          <Image
            src="/dummy-profile-1.jpg"
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full object-cover cursor-pointer"
            onClick={toggleDropdown}
          />

          {/* Dropdown Menu */}
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
                <FontAwesomeIcon icon={faQuestionCircle} className="mr-2" />{" "}
                Help
              </a>
              <hr className="my-2" />
              <a
                href="#"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" /> Sign
                Out
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
