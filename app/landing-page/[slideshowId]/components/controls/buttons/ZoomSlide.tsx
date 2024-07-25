import { ZoomInIcon } from '@radix-ui/react-icons';

import './styles/zoomSlide.css';

export default function ZoomSlide() {
  return (
    <button
      className="zoom_slide__button primary_button centered_button"
      title="Zoom to this slide"
      aria-label='"Zoom to this slide"'
    >
      <ZoomInIcon />
    </button>
  );
}
