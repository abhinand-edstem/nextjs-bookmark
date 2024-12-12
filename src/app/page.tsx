"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl text-red-400">Welcome to BookMark Manager</h1>
      <button
        type="button"
        onClick={() => router.push("/dashboard")}
        className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-5"
      >
        Login
      </button>
      <p>Don't have an account?, Signup Now</p>
    </div>
  );
}
