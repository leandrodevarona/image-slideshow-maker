import CopyLandingPageLink from './buttons/CopyLandingPageLink';
import CreateAndDownloadVideo from './buttons/CreateAndDownloadVideo';
import OpenLandingPage from './buttons/OpenLandingPage';

import './styles/landingPageReferences.css';

export default function LandingPageReferences() {
  return (
    <div className="landing_page__references">
      <CopyLandingPageLink />
      <OpenLandingPage />
      <CreateAndDownloadVideo />
    </div>
  );
}
