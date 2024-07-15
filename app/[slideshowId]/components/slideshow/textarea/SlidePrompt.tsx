import { Slide } from '@prisma/client';

import './styles/slidePrompt.css';

type Props = {
  slide: Slide;
};

export default function SlidePrompt({ slide }: Props) {
  return (
    <div className="slide_prompt">
      <textarea name="description" defaultValue={slide.alt || ''} />
    </div>
  );
}
