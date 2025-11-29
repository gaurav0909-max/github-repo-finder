"use client";

import React from "react";
import { ArrowLeft, Home } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-2xl space-y-8 rounded-lg border border-border p-8 text-center">
        {/* Main Error Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="space-y-2"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1 }}
            className="flex items-center justify-center gap-4 font-mono text-8xl font-bold"
          >
            <span className="gradient-text text-9xl">4</span>
            <span className="gradient-text text-9xl">0</span>
            <span className="gradient-text text-9xl">4</span>
          </motion.div>

          <div className="mt-6 space-y-4">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-2xl font-bold text-foreground"
            >
              Oops! This page could not be found.
            </motion.h1>
          </div>
        </motion.div>

        {/* Icon + Text Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-8 space-y-4"
        >
          <div className="flex items-center justify-center gap-3">
            <span className="text-6xl">🚀</span>
            <p className="text-xl text-muted-foreground">
              Let&apos;s get you back on track.
            </p>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <motion.div
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            transition={{ delay: 1.7, type: "spring", stiffness: 100 }}
          >
            <Button onClick={handleBack} size="lg">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </motion.div>
          <motion.div
            initial={{ x: 100 }}
            animate={{ x: 0 }}
            transition={{ delay: 1.7, type: "spring", stiffness: 100 }}
          >
            <Button variant="outline" size="lg" asChild>
              <a href="/">
                <Home className="mr-2 h-4 w-4" />
                Take Me Home
              </a>
            </Button>
          </motion.div>
        </motion.div>

        {/* Status Code */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="mt-6 inline-block rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
        >
          Status: 404
        </motion.div>
      </div>
    </div>
  );
}
