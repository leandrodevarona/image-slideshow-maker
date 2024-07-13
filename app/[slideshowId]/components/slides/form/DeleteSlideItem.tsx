import Submit from '@ism/app/components/common/buttons/Submit';
import { CrossCircledIcon } from '@radix-ui/react-icons';
import { deleteAction } from '@ism/app/[slideshowId]/lib/actions/slide';

import './styles/deleteSlideItem.css';

type Props = {
  slideshowId: string;
  slideId: string;
};

export default function DeleteSlideItem({ slideshowId, slideId }: Props) {
  const deleteSlide = deleteAction.bind(null, slideshowId, slideId);

  return (
    <form action={deleteSlide}>
      <Submit>
        <CrossCircledIcon />
      </Submit>
    </form>
  );
}
