"use client";

import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

// Helper function to get a cookie by name
function getCookie(name: string) {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    const [cookieName, cookieValue] = cookie.split("=");

    if (cookieName === name) {
      return cookieValue;
    }
  }
  return null;
}

const LoadSession = () => {
  const [mounted, setMounted] = useState(false);

  const { login } = useAuth();
  useEffect(() => {
    setMounted(true);
  }, []);
  if (mounted) {
    axios
      .get("/api/authentication/login")
      .then((response) => {
        if (response.status === 200) {
          login(true);
        }
      })
      .catch(() => {
      });
  }
  return <></>;
};

export default LoadSession;
