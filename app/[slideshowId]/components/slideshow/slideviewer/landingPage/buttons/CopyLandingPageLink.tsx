"use client";

import { Routes } from "@ism/app/lib/utils/routes";
import { Link2Icon } from "@radix-ui/react-icons";
import { useParams } from "next/navigation";
import { Suspense, useTransition } from "react";
import useNotify from "@ism/app/[slideshowId]/lib/hooks/useNotify";
import { NotificationTypes } from "@ism/app/components/common/notifications/Notification";
import clsx from "clsx";

import "./styles/landingPageButtons.css";

function Component() {
  const [isPending, startTransition] = useTransition();

  const params = useParams<{ slideshowId: string }>();

  const { showNotify } = useNotify();

  const handleOnClick = () => {
    startTransition(() => {
      if (!window.location.origin) return;

      const url =
        window.location.origin + Routes.landingPage(params.slideshowId);

      if (!url) return;

      const data = [
        new ClipboardItem({
          "text/plain": Promise.resolve(
            new Blob([url], { type: "text/plain" })
          ),
        }),
      ];

      navigator.clipboard.write(data).then(
        function () {
          showNotify(
            NotificationTypes.success,
            "Copied to clipboard successfully!"
          );
        },
        function () {
          showNotify(
            NotificationTypes.error,
            "Unable to write to clipboard. :-("
          );
        }
      );
    });
  };

  return (
    <button
      className={clsx(
        "landingPage_button",
        "primary_button",
        "centered_button"
      )}
      disabled={isPending}
      title="Copy landing page link to the clipboard"
      aria-label="Copy landing page link to the clipboard"
      onClick={handleOnClick}
    >
      <Link2Icon />
    </button>
  );
}

export default function CopyLandingPageLink() {
  return (
    <Suspense>
      <Component />
    </Suspense>
  );
}
