"use client"

import { useState, useEffect } from "react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import bg1 from "@/public/img/bg1.png";


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
      <div className="h-72 flex shadow-inner border bg-cover bg-no-repeat bg-center bg-blend-multiply bg-neutral-400" style={{ backgroundImage: `url(${bg1.src})` }}>
        <div className="m-auto">
          <p className="text-center font-light text-white mb-3">My Profile</p>
          <h1 className="text-4xl md:text-6xl font-semibold text-white mb-3">{user && user["name"]}</h1>
        </div>
      </div>
      <div className="min-h-screen">
        
      </div>
      <Footer />
    </div>
  );
}