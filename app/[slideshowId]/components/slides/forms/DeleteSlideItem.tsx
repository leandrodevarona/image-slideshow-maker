import Submit from '@ism/app/components/common/buttons/Submit';
import { CrossCircledIcon } from '@radix-ui/react-icons';
import { deleteAction } from '@ism/app/[slideshowId]/lib/actions/slides';

import './styles/deleteSlideItem.css';

type Props = {
  slideshowId: string;
  slideId: string;
};

export default function DeleteSlideItem({ slideshowId, slideId }: Props) {
  const deleteSlide = deleteAction.bind(null, slideshowId, slideId);

  return (
    <form className="delete_slide__item" action={deleteSlide}>
      <Submit ariaLabel="Delete slide" title="Delete this slide">
        <CrossCircledIcon color="red" width={20} height={20} />
      </Submit>
    </form>
  );
}
