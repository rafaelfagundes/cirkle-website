import { Container, Hidden, SwipeableDrawer } from "@material-ui/core";
import dynamic from "next/dynamic";
import PropTypes from "prop-types";
import React, { useState } from "react";
import styled from "styled-components";
import useSWR from "swr";
import initialData from "../../../public/prepopulated.json";
import Colors from "../../enums/Colors";
import { useDialog } from "../../hooks/use-dialog";
// import CustomDialog from "../CustomDialog";
// import Footer from "../Footer";
import SideMenu from "../SideMenu/index";
import NavBarDesktop from "./navBarDesktop";
import NavBarMobile from "./navBarMobile";

const Footer = dynamic(() => import("../Footer"), {
  ssr: false,
});

// const SideMenu = dynamic(() => import("../SideMenu"));

const CustomDialog = dynamic(() => import("../CustomDialog"), {
  ssr: false,
});

const Background = styled.div`
  background: linear-gradient(180deg, #fafafa, ${Colors.ULTRA_LIGHT_GRAY});
`;

function Layout({ children }: { children: JSX.Element }): JSX.Element {
  const [drawer, setDrawer] = useState(false);
  const dialogContext = useDialog();

  const { data: menuData, error } = useSWR("/api/menu", {
    errorRetryInterval: 25000,
    initialData: initialData.menu,
  });
  if (error) console.log("Menu loading error", error);

  return (
    <div>
      <CustomDialog
        open={dialogContext.dialog.isOpen}
        title={dialogContext.dialog.title}
        buttonText={dialogContext.dialog.buttonText}
        onClose={dialogContext.closeDialog}
      >
        {dialogContext.dialog.description}
      </CustomDialog>

      {/* Desktop */}
      <Hidden only={["xs"]}>
        <NavBarDesktop menuData={menuData}></NavBarDesktop>
      </Hidden>
      {/* Mobile */}
      <Hidden only={["sm", "md", "lg", "xl"]}>
        <NavBarMobile setDrawer={setDrawer}></NavBarMobile>
      </Hidden>

      {/* <SizedBox height={32}></SizedBox> */}
      <Hidden only={["xs", "sm"]}>
        <Background>
          <Container maxWidth="md" disableGutters={true}>
            {children}
          </Container>
        </Background>
      </Hidden>
      <Hidden only={["md", "lg", "xl"]}>
        <Background>
          <Container maxWidth="md" disableGutters={true}>
            {children}
          </Container>
        </Background>
        <SwipeableDrawer
          anchor="left"
          open={drawer}
          onClose={() => setDrawer(false)}
          onOpen={() => setDrawer(true)}
        >
          <SideMenu
            data={menuData}
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
