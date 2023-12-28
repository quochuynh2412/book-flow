"use client"

import { useState, useEffect } from "react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";


export default function Page({ params }: { params: { id: string } }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser(id: string) {
      await fetch(`/api/user?userID=${id}`, {
        method: "GET",
      }).then(async (response) => {
        const data = await response.json();
        setUser(data);
      }).catch(error => {
        console.error("Failed to fetch user: ", error);
      });
    }
    fetchUser(params.id);
  }, []);

  return (
    <div >
      <Header />
      <div className="min-h-screen">
        Hello 
        {user && user["name"]}
      </div>
      <Footer />
    </div>
  );
}