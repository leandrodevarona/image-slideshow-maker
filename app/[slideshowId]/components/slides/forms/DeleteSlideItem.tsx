import { CrossCircledIcon } from '@radix-ui/react-icons';
import { deleteAction } from '@ism/app/[slideshowId]/lib/actions/slides';
import Submit from '@ism/app/components/common/buttons/Submit';

import './styles/deleteSlideItem.css';

type Props = {
  slideshowId: string;
  slideId: string;
};

export default function DeleteSlideItem({ slideshowId, slideId }: Props) {
  const deleteItem = deleteAction.bind(null, slideshowId, slideId);

  return (
    <form action={deleteItem}>
      <Submit
      className="delete_slide__item centered_button"
      title="Delete this slide"
      ariaLabel='Delete this slide'
    >
      <CrossCircledIcon color="red" width={20} height={20} />
    </Submit>
    </form>
  );
}
