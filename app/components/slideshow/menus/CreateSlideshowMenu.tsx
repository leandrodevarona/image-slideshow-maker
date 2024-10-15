import DropdownMenu from "../../common/menus/DropdownMenu";
import Link from "next/link";
import CreateSlideshowManually from "../forms/CreateSlideshowManually";
import clsx from "clsx";

import "./styles/createSlideshowMenu.css";

export default function CreateSlideshowMenu() {
  return (
    <DropdownMenu
      className="create_slideshow"
      id="create_slideshow"
      buttonClassName={clsx("create_slideshow__button", "primary_button")}
      buttonContent={"Create slideshow"}
      contentClassName="create_slideshow__content"
    >
      <div className="create_slideshow__container">
        <CreateSlideshowManually />
        <Link className="primary_button" href="?useAi=true" role="button">
          Using ai
        </Link>
      </div>
    </DropdownMenu>
  );
}
