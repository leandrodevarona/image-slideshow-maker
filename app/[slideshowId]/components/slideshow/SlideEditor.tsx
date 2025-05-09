import { SlideshowWithSlides } from "../../lib/types/slideshow";
import PhotoPicker from "../slides/photos/PhotoPicker";
import SlideController from "../slides/SlideController";
import SlideEditorControls from "./SlideEditorControls";
import SlideViewer from "./slideviewer/SlideViewer";
import SlideViewerControls from "./slideviewer/controls/SlideViewerControls";
import SlidePlayerPainter from "./player/SlidePlayerPainter";
import { updateAction } from "../../lib/actions/slides";
import AutoSaveChanges from "./AutoSaveChanges";
import LandingPageReferences from "./slideviewer/landingPage/LandingPageReferences";
import EditSlidePrompt from "../slides/prompts/forms/EditSlidePrompt";
import MobileResolution from "./slideviewer/resolution/MobileResolution";
import clsx from "clsx";

import "./styles/slideEditor.css";

type Props = {
  slideshow: SlideshowWithSlides;
  slideIndex?: number;
  photosQuery?: string;
  editItems?: boolean;
  deleteItem?: boolean;
  pause?: boolean;
  mobile?: boolean;
};

export default function SlideEditor({
  slideshow,
  slideIndex = 0,
  photosQuery,
  editItems = false,
  deleteItem = false,
  pause = false,
  mobile = false,
}: Props) {
  const currentSlide = slideshow.slides.find(
    (slide) => slide.index === slideIndex
  );

  const imgId = "slide_viewer__img" + currentSlide?.id;
  const slideId = currentSlide?.id || "";

  const slidePlayerKey = "slide-player-" + currentSlide?.id;
  const slidePromptKey = "prompt" + slideId + String(mobile);

  const slidesLength = slideshow.slides.length;

  const updateSlideAlt = updateAction.bind(null, slideshow.id, slideId);

  return (
    <div className="slide_editor">
      <section className="slide_editor__viewer-container">
        <SlideViewer
          className={clsx("slide_editor__viewer", mobile && "mobile")}
          imgElemId={imgId}
          slide={currentSlide}
          mobile={mobile}
        >
          <MobileResolution />
          {currentSlide && (
            <>
              <EditSlidePrompt
                key={slidePromptKey}
                imgElemId={imgId}
                slideAlt={currentSlide.alt}
                updateAlt={updateSlideAlt}
              />
              <SlideViewerControls
                slideshowId={slideshow.id}
                slideId={currentSlide.id}
              />
            </>
          )}
          <LandingPageReferences mobile={mobile} />
        </SlideViewer>
      </section>
      <section className="slide_editor__controller">
        <SlideEditorControls
          className="slide_editor__right-controls"
          slideshowId={slideshow.id}
        />
        <SlideController
          className="slide_editor__slide-controller"
          slideshowId={slideshow.id}
          slides={slideshow.slides}
          currentSlideId={currentSlide?.id}
          editing={editItems}
          deleting={deleteItem}
        />
        <PhotoPicker
          className="slide_editor__photo-picker"
          slideshowId={slideshow.id}
          query={photosQuery}
        />
      </section>
      {currentSlide && (
        <SlidePlayerPainter
          key={slidePlayerKey}
          slideId={currentSlide.id}
          slideDuration={currentSlide?.duration}
          slidesLength={slidesLength}
          imgElemId={imgId}
          pause={pause}
        />
      )}
      <AutoSaveChanges slideshowId={slideshow.id} slidesLength={slidesLength} />
    </div>
  );
}
