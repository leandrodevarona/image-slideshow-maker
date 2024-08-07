import { Slide } from "@prisma/client";
import MakeSlidesSortable from "./MakeSlidesSortable";
import { sortSlides } from "../../lib/utils/slides";
import {
  SlideItemSelectable,
  SlideItemToDelete,
  SlideItemToEdit,
} from "./slides";
import clsx from "clsx";

import "./styles/slideController.css";

type Props = {
  className?: string;
  slideshowId: string;
  slides: Slide[];
  currentSlideId?: string;
  editing?: boolean;
  deleting?: boolean;
};

type NoSlideProps = {
  className?: string;
};

function NoSlides({ className }: NoSlideProps) {
  return <div className={clsx("slide_controller", className)}>No slides</div>;
}

export default function SlideController({
  className,
  slideshowId,
  slides,
  currentSlideId,
  editing = false,
  deleting = false,
}: Props) {
  if (!slides || slides.length <= 0) return <NoSlides className={className} />;

  const sortedSlides = sortSlides(slides);

  let elements = null;

  if (deleting) {
    elements = sortedSlides.map((slide) => (
      <SlideItemToDelete
        key={"to-delete" + slide.id}
        slideshowId={slideshowId}
        slide={slide}
        isCurrent={currentSlideId === slide.id}
      />
    ));
  } else if (editing) {
    elements = sortedSlides.map((slide) => (
      <SlideItemToEdit
        key={"to-edit" + slide.id}
        slideshowId={slideshowId}
        slide={slide}
        isCurrent={currentSlideId === slide.id}
      />
    ));
  } else {
    elements = sortedSlides.map((slide) => (
      <SlideItemSelectable
        key={slide.id}
        slide={slide}
        isCurrent={currentSlideId === slide.id}
      />
    ));
  }

  return (
    <ul id={slideshowId} className={clsx("slide_controller", className)}>
      {elements}
      <MakeSlidesSortable slideshowId={slideshowId} />
    </ul>
  );
}
