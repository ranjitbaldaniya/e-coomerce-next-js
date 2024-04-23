"use client";
import Image from "next/image";
import { useState } from "react";
import { signIn } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import sideBarImage from "@/public/Images/sideImage.png";
import { useRouter } from "next/navigation";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!user.email || !user.password) {
        throw new Error("Please fill in all the fields");
      }
      const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
      if (!emailRegex.test(user.email)) {
        throw new Error("Invalid email address");
      }

      const res = await signIn("credentials", {
        email: user.email,
        password: user.password,
        redirect: false,
      });

      if (res?.error) {
        throw new Error(res.error);
      }

      router.push("/dashboard");
    } catch (error : any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // In your login component
const handleGoogleSignIn = async () => {
  try {
    await signIn("google", { callbackUrl: "/dashboard" }); // Specify the callback URL
  } catch (error) {
    console.error("Failed to sign in with Google:", error);
    // Handle error
  }
};

  return (
    <>
      <Toaster />
      <div className="grid grid-cols-2 container pt-20">
        <div className="">
          <Image alt="login image" src={sideBarImage} height={780} width={900} />
        </div>
        <div className="container flex items-center flex-col">
          <form className="flex flex-col lg:mt-20" onSubmit={handleSubmit}>
            <p className="text-4xl">Log in to Exclusive</p>
            <p className="text-base py-3">Enter your details below</p>

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
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <div className="flex py-2.5 px-20 border-2 my-2 border-slate-200 rounded">
            <FcGoogle size={25} />
            <button onClick={handleGoogleSignIn} className="ml-5 text-base">
              Sign up with Google
            </button>
          </div>
          <div className="flex justify-center mt-5">
            <p className="text-base mx-5">Don't have an account?</p>{" "}
            <Link href="/register" className="underline">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
