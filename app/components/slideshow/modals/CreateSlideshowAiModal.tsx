import Modal from '../../common/modal/Modal';
import CreateSlideshowAi from '../forms/CreateSlideshowAi';

import './styles/createSlideshowAiModal.css';

type Props = {
  open?: boolean;
};

export default function CreateSlideshowAiModal({ open = false }: Props) {
  return (
    <Modal id="create_slideshow" open={open} close={{ back: true }}>
      <CreateSlideshowAi />
    </Modal>
  );
}
