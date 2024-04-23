"use client";

import Link from "next/link";
import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { FaBarsStaggered } from "react-icons/fa6";
import { signOut, useSession } from "next-auth/react";
import { FiUser } from "react-icons/fi";

const Navbar = () => {
  let Links = [
    { name: "Home", link: "/" },
    { name: "About us", link: "/aboutus" },
    { name: "Contact us", link: "/contactus" },
  ];
  const [open, setOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const session = useSession();
  // console.log("session ==>", session);

  const isLoggedIn = session.status === "authenticated";
  const toggleUserMenu = () => {
    setUserMenuOpen((prevState) => !prevState);
  };
  return (
    <>
      <div className="shadow-md w-full fixed top-0 left-0">
        <div className="md:flex items-center justify-between bg-white py-6 md:px-10 px-7">
          <div className="font-bold text-2xl cursor-pointer flex items-center gap-1">
            <Link
              href={"/"}
              className="text-gray-800 hover:text-blue-400 duration-500"
            >
              <h2>Exclusive</h2>
            </Link>
          </div>

          {/* Menu icon */}
          <div
            onClick={() => setOpen(!open)}
            className="absolute right-8 top-6 cursor-pointer md:hidden w-7 h-7"
          >
            {open ? <RxCross2 /> : <FaBarsStaggered />}
          </div>
          {/* linke items */}
          <ul
            className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0  w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
              open ? "top-12" : "top-[-490px]"
            }`}
          >
            {Links.map((link) => (
              <li
                className="md:ml-8 md:my-0 my-7 font-semibold"
                key={link.name}
              >
                <Link
                  href={link.link}
                  className="text-gray-800 hover:text-blue-400 duration-500"
                >
                  {link.name}
                </Link>
              </li>
            ))}
            {!isLoggedIn && (
              <>
                <li className="md:ml-8 md:my-0 my-7 font-semibold">
                  <Link
                    href="/login"
                    className="text-gray-800 hover:text-blue-400 duration-500"
                  >
                    Login
                  </Link>
                </li>
                <li className="md:ml-8 md:my-0 my-7 font-semibold">
                  <Link
                    href="/register"
                    className="text-gray-800 hover:text-blue-400 duration-500"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
            <div className="flex gap-6 items-center ml-5 ">
              <div className="relative bg-[#F5F5F5]">
                <input
                  type="text"
                  className="pl-3 pr-10 py-1 border rounded-lg bg-[#F5F5F5]"
                  placeholder="What are you looking for?"
                />
                <IoSearch
                  size={20}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                />
              </div>
              <FaRegHeart size={26} className="cursor-pointer" />
              <MdOutlineShoppingCart size={26} className="cursor-pointer" />
              {isLoggedIn && (
                <div className="relative">
                  <div
                    onClick={toggleUserMenu}
                    className="rounded-full w-8 h-8  gap-0 bg-[#DB4444] cursor-pointer"
                  >
                    <FiUser size={25} className=" text-white m-auto" />
                  </div>
                  {/* Dropdown Menu */}
                  {isLoggedIn && userMenuOpen && (
                    <ul className="absolute right-0 top-full bg-white border rounded-lg mt-1 shadow-md p-5">
                      <li>
                        <Link href="/profile">Profile</Link>
                      </li>
                      <li>
                        <button
                          onClick={() => signOut()}
                          className="block w-full text-left px-2 py-1 text-gray-800 hover:text-blue-400 duration-500 border border-[#DB4444] rounded-md mt-5"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  )}
                </div>
              )}
            </div>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
