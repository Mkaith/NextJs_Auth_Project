"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log("Verification error:", error.message);
    }
  };

  useEffect(() => {
    const urlToken = new URLSearchParams(window.location.search).get("token");
    if (urlToken) setToken(urlToken);
  }, []);

  useEffect(() => {
    if (token) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-6">
      <div className="bg-white shadow-md rounded-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-blue-700 mb-4">
          Email Verification
        </h1>

        {verified && (
          <>
            <p className="text-green-600 mb-6">
              Your email has been successfully verified!
            </p>
            <button
              onClick={() => router.push("/profile")}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Go to Profile
            </button>
          </>
        )}

        {error && (
          <>
            <p className="text-red-600 mb-6">
              Email verification failed. Token may be invalid or expired.
            </p>
            <Link
              href="/login"
              className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition inline-block"
            >
              Back to Login
            </Link>
          </>
        )}

        {!verified && !error && (
          <p className="text-gray-500">Verifying your email...</p>
        )}
      </div>
    </div>
  );
}
