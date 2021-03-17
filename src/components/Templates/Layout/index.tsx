import { Container, Hidden, SwipeableDrawer } from "@material-ui/core";
import dynamic from "next/dynamic";
import PropTypes from "prop-types";
import React, { useState } from "react";
import styled from "styled-components";
import useSWR from "swr";
import { useDialog } from "../../../hooks/dialog/useDialog";
import SideMenu from "../../Organisms/SideMenu/index";
import NavBarDesktop from "./navBarDesktop";
import NavBarMobile from "./navBarMobile";

const Footer = dynamic(() => import("../../Organisms/Footer"), {
  ssr: false,
});

const CustomDialog = dynamic(() => import("../../Atoms/CustomDialog"), {
  ssr: false,
});

const Background = styled.div`
  background: #fbeff7;
`;

interface LayoutProps {
  children: Array<JSX.Element> | JSX.Element;
  containerMargin?: boolean;
  menu?: any;
  search?: any;
}

function Layout({
  children,
  containerMargin = true,
  menu,
  search,
}: LayoutProps): JSX.Element {
  const [drawer, setDrawer] = useState(false);
  const dialogContext = useDialog();

  const { data, error } = useSWR(
    "/menu",
    menu
      ? {
          initialData: menu,
        }
      : undefined
  );
  // console.log("menu", menu);
  // console.log("data", data);
  if (error) console.log("Menu loading error", error);

  return (
    <div style={{ overflowX: "hidden", userSelect: "none" }}>
      <CustomDialog
        open={dialogContext?.dialog?.isOpen}
        title={dialogContext?.dialog?.title}
        buttonText={dialogContext?.dialog?.buttonText}
        error={dialogContext?.dialog?.isError}
        onClose={dialogContext?.closeDialog}
      >
        {dialogContext?.dialog?.description}
      </CustomDialog>

      {/* Desktop */}
      <Hidden only={["xs"]}>
        <NavBarDesktop menuData={data} search={search}></NavBarDesktop>
      </Hidden>
      {/* Mobile */}
      <Hidden only={["sm", "md", "lg", "xl"]}>
        <NavBarMobile setDrawer={setDrawer}></NavBarMobile>
      </Hidden>

      {/* <SizedBox height={32}></SizedBox> */}
      <Hidden only={["xs", "sm"]}>
        <Background>
          <Container
            maxWidth={containerMargin ? "md" : false}
            disableGutters={true}
          >
            {children}
          </Container>
        </Background>
      </Hidden>
      <Hidden only={["md", "lg", "xl"]}>
        <Background>
          <Container
            maxWidth={containerMargin ? "md" : false}
            disableGutters={true}
          >
            {children}
          </Container>
        </Background>
        <SwipeableDrawer
          anchor="left"
          open={drawer}
          onClose={() => setDrawer(false)}
          onOpen={() => setDrawer(true)}
        >
          <SideMenu data={data} closeMenu={() => setDrawer(false)}></SideMenu>
        </SwipeableDrawer>
      </Hidden>
      <Footer menu={menu}></Footer>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.element,
};

export default Layout;
