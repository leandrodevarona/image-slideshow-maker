"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useTransition } from "react";
import { DesktopIcon, MobileIcon } from "@radix-ui/react-icons";
import clsx from "clsx";

import "./styles/mobileResolution.css";

function Component() {
  const mobileResolutionQueryName = "mobile";

  const [isPending, startTransition] = useTransition();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const isMobile =
    Boolean(searchParams.get(mobileResolutionQueryName)) === true;

  const handleOnClick = () => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);

      const isMobile = Boolean(params.get(mobileResolutionQueryName)) === true;

      if (isMobile) params.delete(mobileResolutionQueryName);
      else params.set(mobileResolutionQueryName, "true");

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
      title={isMobile ? "Desktop resolution" : "Mobile resolution"}
      aria-label="Enter/exit mobile resolution"
      onClick={handleOnClick}
    >
      {isMobile ? <DesktopIcon /> : <MobileIcon />}
    </button>
  );
}

export default function MobileResolution() {
  return (
    <Suspense>
      <Component />
    </Suspense>
  );
}
