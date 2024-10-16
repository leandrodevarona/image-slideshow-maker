"use client";

import { Routes } from "@ism/app/lib/utils/routes";
import { DownloadIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useParams } from "next/navigation";
import clsx from "clsx";

import "./styles/landingPageButtons.css";

type Props = {
  mobileResolution?: boolean;
};

export default function CreateAndDownloadVideo({
  mobileResolution = false,
}: Props) {
  const params = useParams<{ slideshowId: string }>();

  let href = Routes.createVideo(params.slideshowId);

  if (mobileResolution) href += "?mobile=true";

  return (
    <Link
      className={clsx(
        "landingPage_button",
        "primary_button",
        "centered_button"
      )}
      href={href}
      target="_blank"
      title="Create and download video from slideshow"
      aria-label="Create and download video from slideshow"
    >
      <DownloadIcon />
    </Link>
  );
}
