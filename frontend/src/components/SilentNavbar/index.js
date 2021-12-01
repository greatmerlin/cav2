import React from "react";
import { animateScroll as scroll } from "react-scroll";
import {
  Nav,
  NavbarContainer,
  NavbarLogo,
  MobileIcon,
} from "./SilentNavbarElements";
import { FaBars } from "react-icons/fa";

const SilentNavbar = ({ toggle }) => {
  const toggleHome = () => {
    scroll.scrollToTop();
  };

  return (
    <>
      <Nav>
        <NavbarContainer>
          <NavbarLogo to="/" onClick={toggleHome}>
            Meta Ping Pong
          </NavbarLogo>
          <MobileIcon>
            <FaBars onClick={toggle} />
          </MobileIcon>
        </NavbarContainer>
      </Nav>
    </>
  );
};

export default SilentNavbar;
