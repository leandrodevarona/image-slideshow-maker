import useSeeSlide from "@ism/app/[slideshowId]/lib/hooks/useSeeSlide";
import { TrackPreviousIcon } from "@radix-ui/react-icons";

import "./styles/previousNext.css";

export default function Previous() {
  const { isPending, currentIndex, seeSlide } = useSeeSlide();

  const handleOnClick = () => {
    if (currentIndex <= 0) return;

    const newIndex = currentIndex - 1;

    seeSlide(newIndex);
  };

  return (
    <button
      className="previous_next__button primary_button centered_button"
      title="Previous"
      disabled={isPending}
      onClick={handleOnClick}
    >
      <TrackPreviousIcon />
    </button>
  );
}
