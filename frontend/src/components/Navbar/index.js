import React, { useState, useEffect } from "react";
import { animateScroll as scroll } from "react-scroll";
import {
  Nav,
  NavbarContainer,
  NavbarLogo,
  MobileIcon,
  NavItem,
  NavMenu,
  NavLinks,
} from "./NavbarElements";
import { FaBars } from "react-icons/fa";

const Navbar = ({ toggle }) => {
  const [scrollNav, setscrollNav] = useState(false);

  const changeNav = () => {
    if (window.scrollY >= 80) {
      setscrollNav(true);
    } else {
      setscrollNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNav);
  }, []);

  const toggleHome = () => {
    scroll.scrollToTop();
  };

  return (
    <>
      <Nav scrollNav={scrollNav}>
        <NavbarContainer>
          <NavbarLogo to="/" onClick={toggleHome}>
            Meta Ping Pong
          </NavbarLogo>
          <MobileIcon>
            <FaBars onClick={toggle} />
          </MobileIcon>
          <NavMenu>
            <NavItem>
              <NavLinks
                to="about"
                smooth="true"
                duration={500}
                spy={true}
                exact="true"
                offset={-80}
              >
                About
              </NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks
                to="howtoplay"
                smooth="true"
                duration={500}
                spy={true}
                exact="true"
                offset={-80}
              >
                How to play
              </NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks
                to="chat"
                smooth="true"
                duration={500}
                spy={true}
                exact="true"
                offset={-80}
              >
                Chat Room
              </NavLinks>
            </NavItem>
          </NavMenu>
        </NavbarContainer>
      </Nav>
    </>
  );
};

export default Navbar;
