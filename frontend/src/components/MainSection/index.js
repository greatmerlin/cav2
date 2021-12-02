import React, { useState } from "react";
import Video from "../../videos/ppvid.mp4";
import { Button } from "../ButtonElement";
import {
  MainSectionContainer,
  MainSectionBg,
  VideoBg,
  MainBtnWrapper,
  MainH1,
  MainP,
  MainSectionContent,
  ArrowForward,
  ArrowRight,
} from "./MainSectionElements";

const MainSection = () => {
  const [hover, sethover] = useState(false);

  const onHover = () => {
    sethover(!hover);
  };

  return (
    <MainSectionContainer>
      <MainSectionBg>
        <VideoBg autoPlay loop muted src={Video} type="video/mp4" />
      </MainSectionBg>
      <MainSectionContent>
        <MainH1>Meta Ping Pong</MainH1>
        <MainP>
          Meta Ping Pong is an e-Platform, in which you can find other players online, chat with them live and also challenge them to player
          ping pong together. If you are more of a solo player, don't worry! You can also play against an AI opponent!
        </MainP>
        <MainBtnWrapper>
          <Button
            to="/login"
            onMouseEnter={onHover}
            onMouseLeave={onHover}
            primary="true"
            dark="true"
          >
            Get started {hover ? <ArrowForward /> : <ArrowRight />}
          </Button>
        </MainBtnWrapper>
      </MainSectionContent>
    </MainSectionContainer>
  );
};

export default MainSection;
