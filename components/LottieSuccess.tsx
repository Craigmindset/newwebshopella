"use client";
import React from "react";
import Lottie from "lottie-react";
import successAnimation from "@/public/result page success motion design.json";

export default function LottieSuccess({ className = "w-32 h-32 mx-auto" }) {
  return (
    <Lottie
      animationData={successAnimation}
      loop={false}
      className={className}
    />
  );
}
