import { Container, Hidden, SwipeableDrawer } from "@material-ui/core";
import dynamic from "next/dynamic";
import PropTypes from "prop-types";
import React, { useState } from "react";
import styled from "styled-components";
import useSWR from "swr";
import Colors from "../../enums/Colors";
import { useDialog } from "../../hooks/dialog/useDialog";
import SideMenu from "../SideMenu/index";
import NavBarDesktop from "./navBarDesktop";
import NavBarMobile from "./navBarMobile";

const Footer = dynamic(() => import("../Footer"), {
  ssr: false,
});

const CustomDialog = dynamic(() => import("../CustomDialog"), {
  ssr: false,
});

const Background = styled.div`
  background: linear-gradient(180deg, #fafafa, ${Colors.ULTRA_LIGHT_GRAY});
`;

interface LayoutProps {
  children: JSX.Element;
}

function Layout(props: LayoutProps): JSX.Element {
  const [drawer, setDrawer] = useState(false);
  const dialogContext = useDialog();

  const { data: menuData, error } = useSWR("/menu");
  if (error) console.log("Menu loading error", error);

  return (
    <div>
      <CustomDialog
        open={dialogContext.dialog.isOpen}
        title={dialogContext.dialog.title}
        buttonText={dialogContext.dialog.buttonText}
        error={dialogContext.dialog.isError}
        onClose={dialogContext.closeDialog}
      >
        {dialogContext.dialog.description}
      </CustomDialog>

      {/* Desktop */}
      <Hidden only={["xs"]}>
        <NavBarDesktop menuData={menuData?.content}></NavBarDesktop>
      </Hidden>
      {/* Mobile */}
      <Hidden only={["sm", "md", "lg", "xl"]}>
        <NavBarMobile setDrawer={setDrawer}></NavBarMobile>
      </Hidden>

      {/* <SizedBox height={32}></SizedBox> */}
      <Hidden only={["xs", "sm"]}>
        <Background>
          <Container maxWidth="md" disableGutters={true}>
            {props.children}
          </Container>
        </Background>
      </Hidden>
      <Hidden only={["md", "lg", "xl"]}>
        <Background>
          <Container maxWidth="md" disableGutters={true}>
            {props.children}
          </Container>
        </Background>
        <SwipeableDrawer
          anchor="left"
          open={drawer}
          onClose={() => setDrawer(false)}
          onOpen={() => setDrawer(true)}
        >
          <SideMenu
            data={menuData?.content}
            closeMenu={() => setDrawer(false)}
          ></SideMenu>
        </SwipeableDrawer>
      </Hidden>
      <Footer></Footer>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.element,
};

export default Layout;
