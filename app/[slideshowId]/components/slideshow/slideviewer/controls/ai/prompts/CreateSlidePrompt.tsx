import { createAction } from '@ism/app/[slideshowId]/lib/actions/prompt';
import Submit from '@ism/app/components/common/buttons/Submit';
import clsx from 'clsx';

import './styles/createSlidePrompt.css';

type Props = {
  className?: string;
  slideshowId: string;
  slideId: string;
};

export default function CreateSlidePrompt({
  className,
  slideshowId,
  slideId,
}: Props) {
  const createPrompt = createAction.bind(null, slideshowId, slideId);

  return (
    <form
      className={clsx('create_slide__prompt', className)}
      action={createPrompt}
    >
      <Submit
        className="primary_button"
        ariaLabel="Generate slide prompt with ai"
        title="Generate slide prompt with ai"
      >
        Prompt
      </Submit>
    </form>
  );
}
