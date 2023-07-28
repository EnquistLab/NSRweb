import React from "react";
import dynamic from "next/dynamic";

import {
  TopBar,
} from "../components/";

export default function Home() {
  const MapWithNoSSR = dynamic(() => import("../components/map/map"), {
    ssr: false
  });

  return (
    <>
      <TopBar />
      <MapWithNoSSR />
    </>
  );
}
