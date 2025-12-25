"use client";

import React from "react";
import Image from "next/image";
import { XMAS_GREETING_SHOWN_EVENT } from "@/components/GreetingOverlay/GreetingOverlay";

type SantaPeekProps = {
  side?: "right" | "left";
};

function SantaGif() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <Image
        src="/santa.gif"
        alt="Santa"
        fill
        unoptimized
        sizes="40vh"
        className="select-none object-cover"
        draggable={false}
        priority
      />
    </div>
  );
}

export default function SantaPeek({ side = "right" }: SantaPeekProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    let alreadyOpened = false;
    const open = () => {
      if (alreadyOpened) return;
      alreadyOpened = true;
      setIsOpen(true);
    };

    const onGreetingShown = () => open();
    window.addEventListener(XMAS_GREETING_SHOWN_EVENT, onGreetingShown);

    const fallback = window.setTimeout(open, 1400);

    return () => {
      window.removeEventListener(XMAS_GREETING_SHOWN_EVENT, onGreetingShown);
      window.clearTimeout(fallback);
    };
  }, []);

  const isRight = side === "right";
  const basePos = isRight ? "right-0" : "left-0";
  const openTransform = "translate-x-0";
  const closedTransform = isRight
    ? "translate-x-[78%]"
    : "-translate-x-[78%]";

  return (
    <button
      type="button"
      onClick={() => setIsOpen((v) => !v)}
      className={[
        "fixed top-1/2 z-40 -translate-y-1/2",
        basePos,
        "group select-none",
        "h-[40vh] w-[40vh] min-h-[120px] min-w-[120px]",
        "transition-transform duration-700 ease-out",
        isOpen ? openTransform : closedTransform,
        "bg-transparent p-0 border-0 leading-none",
        "focus:outline-none",
        "drop-shadow-[0_10px_30px_rgba(0,0,0,0.45)]",
      ].join(" ")}
      aria-label={isOpen ? "Hide Santa" : "Show Santa"}
      title={isOpen ? "Click to hide" : "Click to show"}
    >
      <SantaGif />
    </button>
  );
}
