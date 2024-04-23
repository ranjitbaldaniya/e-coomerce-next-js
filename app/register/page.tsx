"use client";
import Image from "next/image";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import sideBarImage from "@/public/Images/sideImage.png";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (event: any) => {
    // console.log("called", event.target.name);
    const { name, value } = event.target;
    return setUser((prevInfo) => ({ ...prevInfo, [name]: value }));
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    console.log(user);
    try {
      if (!user.name || !user.email || !user.password) {
        setError("please fill all the fields");
        return;
      }
      const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
      if (!emailRegex.test(user.email)) {
        setError("invalid email id");
        return;
      }
      const res = await axios.post("/api/register", user);
      // console.log("res ===> ", res);
      if (res.status == 200 || res.status == 201) {
        console.log("user added successfully");
        setError("");
        router.push("/dashboard");
      }
    } catch (error : any) {
      // console.log("error while registration " , error);
      setError("");
      if(error.response.data.error){
        toast.error(error.response.data.error);
      }else{
        toast.error("Failed to create account. Please try again.");
      }
     
    } finally {
      setLoading(false);

      setUser({
        name: "",
        email: "",
        password: "",
      });
    }
  };
  return (
    <>
      <Toaster />
      <div className="grid grid-cols-2 container py-20">
        <div className="">
          <Image
            alt="login image"
            src={sideBarImage}
            height={780}
            width={900}
          />
        </div>
        <div className="container flex items-center flex-col">
          <form className="flex flex-col lg:mt-20" onSubmit={handleSubmit}>
            <p className="text-4xl">Create an account</p>
            <p className="text-base py-3">Enter your details below</p>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="py-3 text-base focus:outline-none"
              value={user.name}
              onChange={handleInputChange}
            />

            <hr />
            <input
              type="email"
              name="email"
              placeholder="Email or Phone Number"
              className="py-3 text-base focus:outline-none"
              value={user.email}
              onChange={handleInputChange}
            />

            <hr />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="py-3 text-base focus:outline-none"
              value={user.password}
              onChange={handleInputChange}
            />

            <hr />
            {error && <p className="py-6 text-lg text-red-500">{error}</p>}
            <button
              type="submit"
              className="bg-[#DB4444] py-2.5 px-20 border-2 my-2 mt-5 rounded text-white text-base"
              disabled={loading}
            >
              {loading ? "Processing" : " Register"}
            </button>
          </form>
          <div className="flex py-2.5 px-20 border-2 my-2 border-slate-200 rounded">
            <FcGoogle size={25} />
            <button className="ml-5 text-base" onClick={() => signIn("google")}>
              Sign up with Google
            </button>
          </div>
          <div className="flex justify-center mt-5">
            <p className="text-base mx-5">Already have an account?</p>{" "}
            <Link href="/login" className="underline">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
