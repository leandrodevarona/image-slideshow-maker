"use client";

import { Suspense } from "react";
import useSlidePlayer from "@ism/app/[slideshowId]/lib/hooks/useSlidePlayer";
import { PauseIcon, PlayIcon } from "@radix-ui/react-icons";
import clsx from "clsx";

import "./styles/playPause.css";

function Component() {
  const { isPause, isPending, playPause } = useSlidePlayer();

  return (
    <button
      className={clsx("play_pause", "primary_button", "centered_button")}
      disabled={isPending}
      aria-label="Play or pause button"
      title={isPause ? "Play slides" : "Pause slides"}
      onClick={playPause}
    >
      {isPause ? <PlayIcon /> : <PauseIcon />}
    </button>
  );
}

export default function PlayPause() {
  return (
    <Suspense>
      <Component />
    </Suspense>
  );
}
