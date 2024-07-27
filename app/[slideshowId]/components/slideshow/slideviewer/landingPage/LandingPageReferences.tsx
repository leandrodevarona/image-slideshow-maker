import {
  CopyLandingPageLink,
  CreateAndDownloadVideo,
  OpenLandingPage,
} from './buttons';

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
