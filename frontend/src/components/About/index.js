import React, { useState } from "react";
import Sidebar from "../Sidebar";
import SilentNavbar from "../SilentNavbar/index.js";
import Footer from "../Footer";

import {
  Container,
  FormWrap,
  Icon,
  FormContent,
  BlackContainer,
  Text,
  BackButton,
} from "./AboutElements.js";

function About() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
    console.log("ISOPEN---> ", isOpen);
  };
  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <SilentNavbar toggle={toggle} />
      <Container>
        <FormWrap>
          <Icon>About this game</Icon>
          <FormContent>
            <BlackContainer>
              <Text>
                bla bla bla
                <br />
                Have fun playing the game! :)
              </Text>
              Î
            </BlackContainer>
          </FormContent>
        </FormWrap>
        <br />
        <BackButton to="/"> Back </BackButton>
      </Container>
      <Footer />
    </>
  );
}

export default About;
