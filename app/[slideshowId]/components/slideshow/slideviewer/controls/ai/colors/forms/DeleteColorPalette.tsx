import { deleteAction } from '@ism/app/[slideshowId]/lib/actions/colors';
import Submit from '@ism/app/components/common/buttons/Submit';
import { TrashIcon } from '@radix-ui/react-icons';

import './styles/deleteColorPalette.css';

type Props = {
  slideshowId: string;
};

export default function DeleteColorPalette({ slideshowId }: Props) {
  const deleteColors = deleteAction.bind(null, slideshowId);

  return (
    <form action={deleteColors}>
      <Submit
        className="delete_color__palette primary_button centered_button"
        title="Delete this color palette"
        ariaLabel="Delete this color palette"
      >
        <TrashIcon />
      </Submit>
    </form>
  );
}
