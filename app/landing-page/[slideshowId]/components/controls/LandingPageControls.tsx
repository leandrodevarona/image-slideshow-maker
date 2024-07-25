import PlayPause from '@ism/app/[slideshowId]/components/slideshow/slideviewer/controls/player/PlayPause';
import FullScreen from './buttons/FullScreen';

import './styles/landingPageControls.css';

export default function LandingPageControls() {
  return (
    <div className="landing_page__controls">
      <PlayPause />
      <FullScreen />
    </div>
  );
}
