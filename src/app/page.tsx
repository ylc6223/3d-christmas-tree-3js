"use client";

import React from "react";
import "@/helpers/patches";
import DisposableThreeObjectProvider from "@/components/DisposableThreeObjectProvider";
import Scene from "@/components/Scene";
import WallpaperContextWrapper from "@/components/WallpaperContextWrapper";
import {Canvas} from "@react-three/fiber";
import BackgroundMusic from "@/components/BackgroundMusic";
import GreetingOverlay from "@/components/GreetingOverlay";
import SantaPeek from "@/components/SantaPeek";

export default function Home() {
  const [decorEnabled, setDecorEnabled] = React.useState(true);

  return (
    <main className="flex h-full w-full flex-col items-center justify-between select-none relative">
      <BackgroundMusic enabled={decorEnabled} onEnabledChange={setDecorEnabled} />
      {decorEnabled ? <GreetingOverlay message="Merry Christmas" /> : null}
      {decorEnabled ? <SantaPeek /> : null}
      <WallpaperContextWrapper>
        <DisposableThreeObjectProvider>
          <Scene></Scene>
        </DisposableThreeObjectProvider>
      </WallpaperContextWrapper>
    </main>
  );
}
