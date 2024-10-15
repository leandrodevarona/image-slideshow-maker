import {
  CopyLandingPageLink,
  CreateAndDownloadVideo,
  OpenLandingPage,
} from "./buttons";

import "./styles/landingPageReferences.css";

type Props = {
  mobile?: boolean;
};

export default function LandingPageReferences({ mobile = false }: Props) {
  return (
    <div className="landing_page__references">
      <CopyLandingPageLink />
      <OpenLandingPage />
      <CreateAndDownloadVideo mobileResolution={mobile} />
    </div>
  );
}
