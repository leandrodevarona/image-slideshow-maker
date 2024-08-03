import CreateSlideshow from './forms/CreateSlideshow';
import VercelLogo from './VercelLogo';

import './styles/header.css';

export default function Header() {
  return (
    <header className="header">
      <VercelLogo />
      <CreateSlideshow />
    </header>
  );
}
