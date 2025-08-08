"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function OnlineStatus() {
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    const checkOnlineStatus = () => {
      const now = new Date();
      const brasiliaTime = new Date(
        now.toLocaleString("en-US", {
          timeZone: "America/Sao_Paulo",
        })
      );

      const hours = brasiliaTime.getHours();
      const isCurrentlyOnline = hours >= 10 && hours < 22; // 10AM to 10PM

      setIsOnline(isCurrentlyOnline);
    };

    checkOnlineStatus();
    const interval = setInterval(checkOnlineStatus, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className={`
        rounded-lg px-1 py-2 relative overflow-hidden backdrop-blur-md border w-32 mx-auto
        ${
          isOnline
            ? "bg-green-500/20 border-green-500/30"
            : "bg-red-500/20 border-red-500/30"
        }
      `}
    >
      <div className="flex items-center justify-center gap-2">
        <motion.div
          className={`
            w-2 h-2 rounded-full
            ${isOnline ? "bg-green-400 shadow-green-400/60" : "bg-red-400"}
          `}
          animate={
            isOnline && {
              boxShadow: [
                "0 0 6px 3px rgba(34, 197, 94, 0.3)",
                "0 0 15px 3px rgba(34, 197, 94, 0.5)",
                "0 0 6px 3px rgba(34, 197, 94, 0.3)",
              ],
            }
          }
          transition={
            isOnline
              ? {
                  duration: 2.5,
                  repeat: Infinity,
                  ease: [0.4, 0, 0.6, 1],
                  repeatType: "loop",
                }
              : {}
          }
        />

        <span
          className={`
            text-sm font-medium
            ${isOnline ? "text-green-400" : "text-red-400"}
          `}
        >
          {isOnline ? "ONLINE" : "OFFLINE"}
        </span>
      </div>
    </motion.div>
  );
}
