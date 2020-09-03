import React from "react";
import styled from "styled-components";
import MobileTopMenu from "../MobileTopMenu";

const NavBarSpacer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  width: 100%;
`;

function NavBarMobile({
  setDrawer,
}: {
  setDrawer: (val: boolean) => void;
}): JSX.Element {
  return (
    <>
      <NavBarSpacer></NavBarSpacer>
      <MobileTopMenu setDrawer={setDrawer}></MobileTopMenu>
    </>
  );
}

export default NavBarMobile;
