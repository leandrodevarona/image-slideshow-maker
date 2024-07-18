'use client';

import React, { useEffect, useState } from 'react';

type Props = {
  imgElemId: string;
  renderTextarea: (isVisible: boolean) => React.ReactNode;
};

/**
 * This component is used to not see the slide prompt
 * component until the image is completely loaded
 * @param imgElemId The id of the image component that is loaded asynchronously
 * @param renderTextarea The function that will render the textarea if the image is already loaded
 * @returns
 */
export default function SlidePromptVisibilitySetter({
  imgElemId,
  renderTextarea,
}: Props) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const imgElem = document.getElementById(imgElemId) as HTMLImageElement;

    const handleImageLoad = () => {
      setIsVisible(true);
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
  }, [imgElemId]);

  return renderTextarea(isVisible);
}
