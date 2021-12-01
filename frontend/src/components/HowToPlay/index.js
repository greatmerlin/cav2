import React, { useState } from "react";
import Footer from "../Footer";
import Sidebar from "../Sidebar";
import SilentNavbar from "../SilentNavbar/index.js";
import {
  Container,
  FormWrap,
  Icon,
  FormContent,
  BlackContainer,
  Text,
  BackButton,
} from "./HowToPlayElements.js";

function HowToPlay() {
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
          <Icon>Meta Ping Pong Tutorial</Icon>
          <FormContent>
            <BlackContainer>
              <Text>
                Welcome to the Tutorial of the the Meta Ping Pong game!
              </Text>
              <br />
              <Text>
                First, you need to select "get started" from the main page
              </Text>
              <br />
              <Text>Then...</Text>
              <br />
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

export default HowToPlay;
