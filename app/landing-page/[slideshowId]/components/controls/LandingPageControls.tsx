import FullScreen from './buttons/FullScreen';
import ZoomSlide from './buttons/ZoomSlide';

import './styles/landingPageControls.css';

export default function LandingPageControls() {
  return (
    <div className="landing_page__controls">
      <FullScreen />
      <ZoomSlide />
    </div>
  );
}
