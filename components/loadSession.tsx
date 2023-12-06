"use client";

import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import axios from "axios";

const LoadSession = () => {
  const [mounted, setMounted] = useState(false);

  const { login } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/authentication/login");
        if (response.status === 200) {
          console.log("hello");
          login(true);
        }
      } catch (error) {
      } finally {
        setMounted(true);
      }
    };

    if (!mounted) {
      fetchData();
    }
  }, [mounted, login]);

  return <></>;
};

export default LoadSession;
