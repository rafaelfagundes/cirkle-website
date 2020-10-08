import { AppBar } from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import React from "react";
import styled from "styled-components";
import DesktopTopMenu from "../DesktopTopMenu";

const NavBarSpacer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 110px;
  width: 100%;
`;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
}

function HideOnScroll(props: Props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

function NavBarDesktop({ menuData }: { menuData: any }): JSX.Element {
  return (
    <>
      <NavBarSpacer></NavBarSpacer>
      <HideOnScroll>
        <AppBar position="fixed" color="transparent" elevation={0}>
          <DesktopTopMenu data={menuData}></DesktopTopMenu>
        </AppBar>
      </HideOnScroll>
    </>
  );
}

export default NavBarDesktop;
