import React from "react";
import {
  SidebarContainer,
  Icon,
  CloseIcon,
  SidebarWrapper,
  SidebarMenu,
  SidebarLink,
  SideBtnWrap,
  SidebarRoute,
} from "./SidebarElements";

const Sidebar = ({ isOpen, toggle }) => {
  return (
    <SidebarContainer isOpen={isOpen}>
      <Icon>
        <CloseIcon onClick={toggle} />
      </Icon>
      <SidebarWrapper>
        <SidebarMenu>
          <SidebarLink to="/about">About</SidebarLink>
          <SidebarLink to="/howtoplay">How to play</SidebarLink>
          <SidebarLink to="/chat">Chat Room</SidebarLink>
        </SidebarMenu>
        <SideBtnWrap>
          <SidebarRoute to="/login">Get started</SidebarRoute>
        </SideBtnWrap>
      </SidebarWrapper>
    </SidebarContainer>
  );
};

export default Sidebar;
