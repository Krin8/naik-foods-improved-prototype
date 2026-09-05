"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function ReferralTracker() {
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref");

  useEffect(() => {
    if (ref) {
      localStorage.setItem("promoCode", ref);
      // Optional: Add a toast notification here if you have a toast library
      console.log(`Referral code ${ref} saved!`);
    }
  }, [ref]);

  return null; // This component doesn't render anything
}
