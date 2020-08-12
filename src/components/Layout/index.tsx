import { Container, Hidden, SwipeableDrawer } from "@material-ui/core";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { Colors } from "../../theme/theme";
import SideMenu from "../SideMenu/index";
import TopTextBanner from "../TopTextBanner";
import NavBarDesktop from "./navBarDesktop";
import NavBarMobile from "./navBarMobile";

function Layout({ children }: { children: JSX.Element }): JSX.Element {
  const [drawer, setDrawer] = useState(false);

  return (
    <div>
      {/* Desktop */}
      <Hidden only={["xs"]}>
        <NavBarDesktop></NavBarDesktop>
      </Hidden>
      {/* Mobile */}
      <Hidden only={["sm", "md", "lg", "xl"]}>
        <NavBarMobile setDrawer={setDrawer}></NavBarMobile>
      </Hidden>
      <TopTextBanner color={Colors.PALATINE_PURPLE} textColor={Colors.WHITE}>
        Frete grátis para pedidos acima de R$ 200,00
      </TopTextBanner>
      <Hidden only={["xs"]}>
        <Container maxWidth="md">{children}</Container>
      </Hidden>
      <Hidden only={["sm", "md", "lg", "xl"]}>
        <Container maxWidth="md" disableGutters={true}>
          {children}
        </Container>
        <SwipeableDrawer
          anchor="left"
          open={drawer}
          onClose={() => setDrawer(false)}
          onOpen={() => setDrawer(true)}
        >
          <SideMenu></SideMenu>
        </SwipeableDrawer>
      </Hidden>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.element,
};

export default Layout;