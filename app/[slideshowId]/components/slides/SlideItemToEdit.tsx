import { Slide } from '@prisma/client';
import SlideItem from './SlideItem';
import { updateAction } from '../../lib/actions/slide';
import Submit from '@ism/app/components/common/buttons/Submit';
import { CheckIcon } from '@radix-ui/react-icons';

import './styles/slideItemToEdit.css';

type Props = {
  slideshowId: string;
  slide: Slide;
};

export default function SlideItemToEdit({ slideshowId, slide }: Props) {
  const updateSlide = updateAction.bind(null, slideshowId, slide.id);

  return (
    <SlideItem slide={slide}>
      <form className="slide_item__to-edit" action={updateSlide}>
        <input
          type="number"
          name="duration"
          defaultValue={slide.duration}
          min={3}
          max={20}
        />
        <Submit className="primary_button">
          <CheckIcon />
        </Submit>
      </form>
    </SlideItem>
  );
}
