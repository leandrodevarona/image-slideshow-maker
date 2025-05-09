"use client";

import { EnterFullScreenIcon, ExitFullScreenIcon } from "@radix-ui/react-icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useTransition } from "react";
import clsx from "clsx";

import "./styles/fullScreen.css";

function Component() {
  const fullScreenQueryName = "fullScreen";

  const [isPending, startTransition] = useTransition();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const isFullScreen = Boolean(searchParams.get(fullScreenQueryName)) === true;

  const handleOnClick = () => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);

      const isFullScreen = Boolean(params.get(fullScreenQueryName)) === true;

      if (isFullScreen) params.delete(fullScreenQueryName);
      else params.set(fullScreenQueryName, "true");

      replace(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <button
      className={clsx(
        "full_screen__button",
        "primary_button",
        "centered_button"
      )}
      disabled={isPending}
      title={isFullScreen ? "Exit full screen" : "Enter full screen"}
      aria-label="Enter/exit full screen button"
      onClick={handleOnClick}
    >
      {isFullScreen ? <ExitFullScreenIcon /> : <EnterFullScreenIcon />}
    </button>
  );
}

export default function FullScreen() {
  return (
    <Suspense>
      <Component />
    </Suspense>
  );
}
