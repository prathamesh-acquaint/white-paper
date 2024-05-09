"use client";

import Link from "next/link";
import LogoutBtn from "./LogoutBtn";
import Image from "next/image";
import { useState } from "react";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <nav className="bg-white border-b border-gray-100">
      <div className="max-w-full lg:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="shrink-0 flex items-center">
              <Link href="/dashboard">
                <Image
                  src={"/assets/logo.svg"}
                  alt="logo"
                  width={30}
                  height={30}
                />
              </Link>
            </div>

            <div className="hidden md:flex md:ml-10 -my-px space-x-8  ">
              <Link
                className="inline-flex items-center px-1 pt-1 border-b-2 border-indigo-400 text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out"
                href="/dashboard"
              >
                Dashboard
              </Link>
            </div>
          </div>

          <div className="hidden md:flex md:items-center md:ml-6">
            <div className="ml-3 relative">
              <LogoutBtn />
            </div>
          </div>

          <div className="flex md:hidden -mr-2 items-center">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
              onClick={() => setShowDropdown((prev) => !prev)}
            >
              <Image
                src={`/assets/${showDropdown ? "cross" : "toggle"}.svg`}
                alt="toggle btn"
                width={24}
                height={24}
              />
            </button>
          </div>
        </div>
      </div>

      {showDropdown && (
        <div className="block md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              className="block w-full pl-3 pr-4 py-2 border-l-4 border-indigo-400 text-left text-base font-medium text-indigo-700 bg-indigo-50 focus:outline-none focus:text-indigo-800 focus:bg-indigo-100 focus:border-indigo-700 transition duration-150 ease-in-out"
              href="/dashboard"
            >
              Dashboard
            </Link>
          </div>

          <div className="pt-4 pb-1 border-t border-gray-200">
            <div className="ml-3 space-y-1">
              <LogoutBtn />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
