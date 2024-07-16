'use client';

/**
 * This hook is used to obtain the current order of the slides in a given slideshow
 * @param slideshowId The id of the current slideshow
 */
export default function useSlideOrder(slideshowId: string) {
  const getSlideOrder = () => {
    const slideList = document.getElementById(slideshowId);

    if (slideList) {
      const slides = slideList.getElementsByTagName('li');

      const slideIds = Array.from(slides).map((li) => li.id);

      return slideIds;
    }

    return null;
  };

  return { getSlideOrder };
}
