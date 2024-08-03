import VercelLogo from './VercelLogo';
import CreateSlideshowMenu from './slideshow/menus/CreateSlideshowMenu';

import './styles/header.css';

export default function Header() {
  return (
    <header className="header">
      <VercelLogo />
      <CreateSlideshowMenu />
    </header>
  );
}
