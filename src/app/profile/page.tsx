"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const [userData, setUserData] = useState<string | null>(null);

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout Successful");
      router.push("/login");
    } catch (error: any) {
      console.error(error.message);
      toast.error(error.message);
    }
  };

  const getUserData = async () => {
    try {
      const res = await axios.get("/api/users/me");
      setUserData(res.data.data._id);
    } catch (error: any) {
      console.error(error.message);
      toast.error("Failed to fetch user data");
    }
  };

  // Fetch user data when the component mounts
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6 py-12 text-gray-800">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <h1 className="text-3xl font-extrabold text-center text-blue-700">
          User Profile
        </h1>
        <p className="text-center text-gray-600">This is your profile page</p>

        <div className="flex flex-col items-center gap-2">
          <span className="text-gray-500">User ID:</span>
          {userData ? (
            <Link
              href={`/profile/${userData}`}
              className="text-blue-600 hover:underline break-all"
            >
              {userData}
            </Link>
          ) : (
            <span className="italic text-gray-400">Loading...</span>
          )}
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
          <button
            onClick={logout}
            className="w-full sm:w-auto px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
