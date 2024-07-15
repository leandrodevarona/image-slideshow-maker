import Submit from '@ism/app/components/common/buttons/Submit';
import clsx from 'clsx';

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
  return (
    <form className={clsx('create_slide__prompt', className)} action="">
      <Submit
        className="primary_button"
        ariaLabel="Generate slide prompt with ai"
        title="Generate slide prompt with ai"
      >
        ai
      </Submit>
    </form>
  );
}
