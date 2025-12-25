"use client";

import React from "react";

export const XMAS_GREETING_SHOWN_EVENT = "xmas:greetingShown";

type GreetingOverlayProps = {
  message?: string;
};

export default function GreetingOverlay({
  message = "圣诞快乐，愿你平安喜乐",
}: GreetingOverlayProps) {
  return (
    <div className="pointer-events-none fixed inset-0 z-40 flex items-start justify-center pt-20">
      <div
        className="xmas-fade-in"
        onAnimationEnd={() => {
          window.dispatchEvent(new CustomEvent(XMAS_GREETING_SHOWN_EVENT));
        }}
      >
        <div className="xmas-float">
          <div className="xmas-greeting-text select-none text-center text-2xl font-semibold tracking-wide sm:text-3xl">
            {message}
          </div>
        </div>
      </div>
    </div>
  );
}
