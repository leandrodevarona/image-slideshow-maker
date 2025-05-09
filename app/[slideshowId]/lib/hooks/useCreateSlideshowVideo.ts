"use client";

import { useEffect, useRef, useState } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import useNotify from "./useNotify";
import { NotificationTypes } from "@ism/app/components/common/notifications/Notification";
import { SlideshowWithSlides } from "../types/slideshow";
import { sortSlides } from "../utils/slides";

export enum VideoQuality {
  FHD = "FHD",
  HD = "HD",
  SD = "SD",
}

export enum VideoQualityMobile {
  FHD_MOBILE = "FHD_MOBILE",
  HD_MOBILE = "HD_MOBILE",
  SD_MOBILE = "SD_MOBILE",
}

const qualities: Record<VideoQuality | VideoQualityMobile, string> = {
  FHD: "1920:1080",
  HD: "1280:720",
  SD: "720:480",
  FHD_MOBILE: "1080:1920",
  HD_MOBILE: "720:1280",
  SD_MOBILE: "480:720",
};

export default function useCreateSlideshowVideo(
  slideshow: SlideshowWithSlides,
  quality?: VideoQuality | VideoQualityMobile,
  mobile?: boolean
) {
  if (!quality)
    quality = mobile ? VideoQualityMobile.HD_MOBILE : VideoQuality.HD;

  const [isLoading, setIsLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const ffmpegRef = useRef(new FFmpeg());

  const { showNotify } = useNotify();

  const load = async () => {
    setIsLoading(true);
    const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";
    const ffmpeg = ffmpegRef.current;
    ffmpeg.on("log", ({ message }) => {
      console.log(message);
    });
    // toBlobURL is used to bypass CORS issue, urls with the same
    // domain can be used directly.
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.wasm`,
        "application/wasm"
      ),
    });
    setIsLoading(false);
  };

  const createVideo = async () => {
    try {
      await load();

      setIsLoading(true);
      const ffmpeg = ffmpegRef.current;

      if (!ffmpeg.loaded) throw new Error("Ffmpeg no loaded.");

      const slides = slideshow.slides;

      const sortedSlide = sortSlides(slides);

      for (let i = 0; i < sortedSlide.length; i++) {
        await ffmpeg.writeFile(
          `img${i}.jpeg`,
          await fetchFile(sortedSlide[i].src)
        );
      }

      const fileList = sortedSlide
        .map(
          (_, i) => `file 'img${i}.jpeg'\nduration ${sortedSlide[i].duration}`
        )
        .join("\n");

      await ffmpeg.writeFile("filelist.txt", fileList);

      ffmpeg.on("progress", (evt) => {
        setProgress(evt.progress * 100);
      });

      const scale = qualities[quality] || qualities[VideoQuality.HD];

      console.log("Scale: ", scale);

      for (let i = 0; i < sortedSlide.length; i++) {
        await ffmpeg.exec([
          "-i",
          `img${i}.jpeg`,
          "-vf",
          `scale=${scale}:force_original_aspect_ratio=1,pad=${scale}:(ow-iw)/2:(oh-ih)/2`,
          `img${i}_scaled.jpeg`,
        ]);
      }

      let lastIndex = 0;

      const scaledFileList = sortedSlide.map((_, i) => {
        lastIndex = i;
        return `file 'img${i}_scaled.jpeg'\nduration ${sortedSlide[i].duration}`;
      });

      // Due to a quirk, the last image has to be specified twice - the 2nd time without any duration directive
      scaledFileList.push(`file 'img${lastIndex}_scaled.jpeg'`);

      const scaledFileListStr = scaledFileList.join("\n");

      console.log("Scaled file list: ", scaledFileListStr);

      await ffmpeg.writeFile("scaled_filelist.txt", scaledFileListStr);

      await ffmpeg.exec([
        "-f",
        "concat",
        "-safe",
        "0",
        "-i",
        "scaled_filelist.txt",
        "-vsync",
        "vfr",
        "-pix_fmt",
        "yuv420p",
        "output.mp4",
      ]);

      const data = await ffmpeg.readFile("output.mp4");

      const downloadUrl = URL.createObjectURL(
        new Blob([data], { type: "video/mp4" })
      );

      setVideoUrl(downloadUrl);
    } catch (error) {
      showNotify(
        NotificationTypes.error,
        "An error occurred while creating the video, please try again later."
      );
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (videoUrl) {
      // Crear un enlace de descarga y simular un clic
      const a = document.createElement("a");
      a.href = videoUrl;
      a.download = `${slideshow.name}.mp4`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }, [slideshow.name, videoUrl]);

  return { isLoading, progress, createVideo };
}
