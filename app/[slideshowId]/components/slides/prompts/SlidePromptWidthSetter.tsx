'use client';

import { useEffect } from 'react';

type Props = {
  imgElemId: string;
  textareaElemId: string;
};

export default function SlidePromptWidthSetter({
  imgElemId,
  textareaElemId,
}: Props) {
  useEffect(() => {
    const imgElem = document.getElementById(imgElemId) as HTMLImageElement;

    const handleImageLoad = () => {
      if (imgElem) {
        const textareaElem = document.getElementById(textareaElemId);

        if (textareaElem) {
          const mediaWidth = imgElem.naturalWidth; // En el caso de que sea una imagen
          const mediaHeight = imgElem.naturalHeight; // En el caso de que sea una imagen
          const { offsetWidth, offsetHeight } = imgElem;
          const widthRatio = offsetWidth / mediaWidth;
          const heightRatio = offsetHeight / mediaHeight;
          const aspectRatio = Math.min(widthRatio, heightRatio);
          const width = mediaWidth * aspectRatio || 300;
          const textareaWidth = width * 0.8;

          // Tuve que hacer esto por el comportamiento del textarea
          if (textareaElem.tagName === 'TEXTAREA') {
            textareaElem.style.width = `${textareaWidth}px`;
            return;
          }

          textareaElem.style.maxWidth = `${textareaWidth}px`;
        }
      }
    };

    if (imgElem) {
      if (imgElem.complete) {
        handleImageLoad();
      } else {
        imgElem.addEventListener('load', handleImageLoad);
      }
    }

    return () => {
      if (imgElem) {
        imgElem.removeEventListener('load', handleImageLoad);
      }
    };
  }, [imgElemId, textareaElemId]);

  return null;
}
